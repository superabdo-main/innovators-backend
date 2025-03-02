import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { OperationStatus } from '@prisma/client';
import { FixerScoreDto, FixerAvailabilityResponseDto, FixerWithRelations } from './dto/fixer-assignment.dto';

@Injectable()
export class FixerAssignmentService {
  private readonly logger = new Logger(FixerAssignmentService.name);
  private readonly MINIMUM_BREAK_MINUTES = 15;
  private readonly MAX_LOOKUP_HOURS = 24;
  private readonly TIME_INCREMENT_MINUTES = 30;

  constructor(private prisma: PrismaService) {}

  private parseTimeString(timeStr: string): number {
    try {
      const [hours, minutes] = timeStr.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid time format');
      }
      return hours * 60 + minutes;
    } catch (error) {
      throw new BadRequestException(`Invalid time string format: ${timeStr}`);
    }
  }

  private formatTimeString(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date object');
    }
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  private isTimeInRange(timeToCheck: string, startTime: string, endTime: string): boolean {
    try {
      const checkMinutes = this.parseTimeString(timeToCheck);
      const startMinutes = this.parseTimeString(startTime);
      const endMinutes = this.parseTimeString(endTime);

      // Handle overnight shifts (e.g., 20:00 to 04:00)
      if (startMinutes > endMinutes) {
        return checkMinutes >= startMinutes || checkMinutes <= endMinutes;
      }

      return checkMinutes >= startMinutes && checkMinutes <= endMinutes;
    } catch (error) {
      this.logger.error(`Error checking time range: ${error.message}`);
      return false;
    }
  }

  private async isFixerAvailable(
    fixer: FixerWithRelations,
    workDateTime: Date,
    endDateTime: Date,
  ): Promise<boolean> {
    try {
      const workTimeStr = this.formatTimeString(workDateTime);
      const endTimeStr = this.formatTimeString(endDateTime);

      // First check if the work time falls within the fixer's shift
      if (!fixer.workShift || !this.isTimeInRange(workTimeStr, fixer.workShift.start, fixer.workShift.end)) {
        return false;
      }

      // Check for overlapping orders
      for (const order of fixer.orders) {
        const orderStart = this.formatTimeString(order.startTime);
        const orderEndWithBreak = new Date(order.endTime);
        orderEndWithBreak.setMinutes(orderEndWithBreak.getMinutes() + this.MINIMUM_BREAK_MINUTES);
        const orderEndWithBreakStr = this.formatTimeString(orderEndWithBreak);

        if (this.isTimeInRange(workTimeStr, orderStart, orderEndWithBreakStr) ||
            this.isTimeInRange(endTimeStr, orderStart, orderEndWithBreakStr)) {
          return false;
        }
      }

      return true;
    } catch (error) {
      this.logger.error(`Error checking fixer availability: ${error.message}`);
      return false;
    }
  }

  async findAvailableFixers(
    serviceIds: number[],
    workDateTime: Date,
    estimatedDuration: number,
  ): Promise<FixerAvailabilityResponseDto> {
    try {
      if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
        throw new BadRequestException('Service IDs must be provided');
      }

      if (!(workDateTime instanceof Date) || isNaN(workDateTime.getTime())) {
        throw new BadRequestException('Invalid work date time');
      }

      if (!Number.isInteger(estimatedDuration) || estimatedDuration <= 0) {
        throw new BadRequestException('Invalid estimated duration');
      }

      const endDateTime = new Date(
        workDateTime.getTime() + estimatedDuration * 60 * 1000,
      );

      const workTimeStr = this.formatTimeString(workDateTime);
      const endTimeStr = this.formatTimeString(endDateTime);

      // Get all potential fixers based on active services and basic criteria
      const potentialFixers = await this.prisma.fixerUser.findMany({
        where: {
          AND: [
            { isBanned: false },
            { pause: false },
            {
              activeServices: {
                some: {
                  id: { in: serviceIds },
                },
              },
            },
          ],
        },
        include: {
          stats: true,
          orders: {
            where: {
              OR: [
                { status: OperationStatus.PENDING },
                { status: OperationStatus.ACTIVE },
              ],
              closed: false,
            },
            select: {
              startTime: true,
              endTime: true,
              maintenanceDuration: true,
            },
          },
          workShift: {
            select: {
              start: true,
              end: true,
            },
          },
          activeServices: {
            where: {
              id: { in: serviceIds },
            },
          },
        },
      });

      if (potentialFixers.length === 0) {
        this.logger.warn('No potential fixers found for the given services');
        return {
          availableFixers: [],
          nextAvailableTime: await this.findNextAvailableTime(serviceIds, workDateTime),
        };
      }

      // Filter fixers by shift time and availability
      const availableFixers: FixerScoreDto[] = [];
      
      for (const fixer of potentialFixers) {
        // Skip fixers without work shifts
        if (!fixer.workShift?.start || !fixer.workShift?.end) {
          this.logger.debug(`Skipping fixer ${fixer.id} - no work shift defined`);
          continue;
        }

        // Check if work time falls within fixer's shift
        const isInShift = this.isTimeInRange(
          workTimeStr,
          fixer.workShift.start,
          fixer.workShift.end
        );

        if (!isInShift) {
          this.logger.debug(`Skipping fixer ${fixer.id} - work time outside shift hours`);
          continue;
        }

        // Check if end time also falls within shift or crosses to next shift appropriately
        const isEndInShift = this.isTimeInRange(
          endTimeStr,
          fixer.workShift.start,
          fixer.workShift.end
        );

        // For overnight shifts, we need special handling
        const shiftStartMinutes = this.parseTimeString(fixer.workShift.start);
        const shiftEndMinutes = this.parseTimeString(fixer.workShift.end);
        const isOvernightShift = shiftStartMinutes > shiftEndMinutes;

        // If it's not an overnight shift and end time is outside shift, skip
        if (!isOvernightShift && !isEndInShift) {
          this.logger.debug(`Skipping fixer ${fixer.id} - end time outside shift hours`);
          continue;
        }

        // Check for availability considering existing orders
        if (await this.isFixerAvailable(fixer as FixerWithRelations, workDateTime, endDateTime)) {
          const score = this.calculateFixerScore(fixer as FixerWithRelations);
          availableFixers.push({ fixer, score });
          this.logger.debug(`Fixer ${fixer.id} is available with score ${score}`);
        }
      }

      if (availableFixers.length === 0) {
        this.logger.warn('No available fixers found for the given time slot');
        return {
          availableFixers: [],
          nextAvailableTime: await this.findNextAvailableTime(serviceIds, workDateTime),
        };
      }

      // Sort by score descending
      availableFixers.sort((a, b) => b.score - a.score);

      return {
        availableFixers,
        suggestedFixer: availableFixers[0],
      };
    } catch (error) {
      this.logger.error('Error finding available fixers:', error);
      throw error;
    }
  }

  private async findNextAvailableTime(
    serviceIds: number[],
    startTime: Date,
  ): Promise<Date | null> {
    try {
      const qualifiedFixers = await this.prisma.fixerUser.findMany({
        where: {
          isBanned: false,
          pause: false,
          activeServices: {
            some: {
              id: { in: serviceIds },
            },
          },
        },
        include: {
          orders: {
            where: {
              OR: [
                { status: OperationStatus.PENDING },
                { status: OperationStatus.ACTIVE },
              ],
              closed: false,
            },
            select: {
              startTime: true,
              endTime: true,
            },
          },
          workShift: true,
        },
      });

      if (qualifiedFixers.length === 0) return null;

      let earliestTime = startTime;
      let found = false;
      const maxAttempts = (this.MAX_LOOKUP_HOURS * 60) / this.TIME_INCREMENT_MINUTES;
      let attempts = 0;

      while (!found && attempts < maxAttempts) {
        for (const fixer of qualifiedFixers) {
          if (await this.isFixerAvailable(
            fixer as FixerWithRelations,
            earliestTime,
            new Date(earliestTime.getTime() + 60 * 60 * 1000) // 1 hour duration
          )) {
            found = true;
            break;
          }
        }

        if (!found) {
          earliestTime = new Date(earliestTime.getTime() + this.TIME_INCREMENT_MINUTES * 60 * 1000);
          attempts++;
        }
      }

      return found ? earliestTime : null;
    } catch (error) {
      this.logger.error('Error finding next available time:', error);
      return null;
    }
  }

  private calculateFixerScore(fixer: FixerWithRelations): number {
    try {
      let score = 0;

      if (fixer.stats) {
        // Experience score (max 20 points)
        const experienceScore = Math.min(fixer.stats.monthsOfExperience * 0.5, 20);
        score += experienceScore;

        // Rating score (max 30 points)
        const ratingScore = (fixer.stats.averageRating / 5) * 30;
        score += ratingScore;

        // Completed jobs score (max 20 points)
        const completedJobsScore = Math.min(fixer.stats.completedJobs * 0.2, 20);
        score += completedJobsScore;
      }

      // Verification bonuses
      if (fixer.isVerified) score += 15;
      if (fixer.idCardApproved) score += 15;

      return Math.round(score);
    } catch (error) {
      this.logger.error(`Error calculating fixer score: ${error.message}`);
      return 0;
    }
  }

  async assignFixerToOrder(
    orderId: number,
    fixerId: number,
    startTime: Date,
    estimatedDuration: number,
  ) {
    try {
      const endTime = new Date(
        startTime.getTime() + estimatedDuration * 60 * 1000,
      );

      await this.prisma.orderOperator.update({
        where: { id: orderId },
        data: {
          fixers: {
            connect: { id: fixerId },
          },
          leaderId: fixerId,
          startTime,
          endTime,
          status: OperationStatus.PENDING,
        },
      });

      // Create notification for the assigned fixer
      await this.prisma.notification.create({
        data: {
          userId: fixerId,
          type: 'ORDER_ASSIGNMENT',
          title: 'New Order Assignment',
          message: `You have been assigned to order #${orderId}`,
          data: { orderId },
        },
      });

      return {
        success: true,
        message: 'Fixer successfully assigned to order',
      };
    } catch (error) {
      this.logger.error('Error assigning fixer to order:', error);
      throw error;
    }
  }
}
