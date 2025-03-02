import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FixerService {
  constructor(private prisma: PrismaService) {}

  async fetchFixerData(id: string) {
    try {
      const fixer = await this.prisma.fixerUser.findUnique({
        where: { userId: id },
        include: {
          balance: true,
          idCard: true,
          stats: true,
        },
      });

      if (!fixer) {
        return {
          data: {},
          status: 404,
          ok: false,
          error: 'Fixer not found',
        };
      }

      const { password, ...result } = fixer;
      return {
        data: result,
        status: 200,
        ok: true,
        error: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to fetch fixer data',
          additionalInfo: {
            details: error.message,
            code: 'FIXER_FETCH_ERROR'
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  

  // async findAvailableFixers(number: number, startDate: Date) {
  //   try {
  //     // First attempt: Find fixers without active orders at the startDate
  //     console.log(startDate);
      
  //     const availableFixers = await this.prisma.fixerUser.findMany({
  //       where: {
  //         activeOrder: null,
  //         orders: {
  //           none: {
  //             startDate: {
  //               gte: startDate,
  //               lte: new Date(startDate.getTime() + 1 * 60 * 60 * 1000)
  //             }
  //           }
  //         }
  //       },
  //       select: {
  //         id: true,
  //         userId: true,
  //         stats: {
  //           select: {
  //             averageRating: true,
  //             completedJobs: true,
  //           }
  //         },
  //         orders: {
  //           where: {
  //             startDate: {
  //               gte: startDate
  //             }
  //           },
  //           select: {
  //             startDate: true
  //           }
  //         }
  //       },
  //       orderBy: [
  //         { stats: { averageRating: 'desc' } },
  //         { stats: { completedJobs: 'desc' } }
  //       ]
  //     });

  //     // If no fixers available at requested time, suggest next available time
  //     if (availableFixers.length === 0) {
  //       const nextAvailableTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // +2 hours
  //       return {
  //         data: {
  //           fixerIds: [],
  //           leaderId: null,
  //           nextAvailableTime,
  //           message: 'No fixers available at requested time. Next available time slot suggested.'
  //         },
  //         status: 200,
  //         ok: true,
  //         error: '',
  //       };
  //     }

  //     // Filter fixers based on their schedule conflicts
  //     const scheduledFixers = availableFixers.filter(fixer => {
  //       // Check if fixer has any overlapping orders
  //       const hasConflict = fixer.orders.some(order => {
  //         const orderTime = new Date(order.startDate).getTime();
  //         const requestedTime = startDate.getTime();
  //         return Math.abs(orderTime - requestedTime) < 2 * 60 * 60 * 1000; // 2 hour buffer
  //       });
  //       return !hasConflict;
  //     });

  //     // Sort by rating and experience
  //     scheduledFixers.sort((a, b) => {
  //       const ratingA = a.stats?.averageRating || 0;
  //       const ratingB = b.stats?.averageRating || 0;
  //       const jobsA = a.stats?.completedJobs || 0;
  //       const jobsB = b.stats?.completedJobs || 0;
        
  //       if (ratingA !== ratingB) return ratingB - ratingA;
  //       return jobsB - jobsA;
  //     });

  //     // Take requested number of fixers (or all available if less than requested)
  //     const selectedFixers = scheduledFixers.slice(0, Math.min(number, scheduledFixers.length));
      
  //     if (selectedFixers.length === 0) {
  //       const nextAvailableTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  //       return {
  //         data: {
  //           fixerIds: [],
  //           leaderId: null,
  //           nextAvailableTime,
  //           message: 'All available fixers have schedule conflicts. Next time slot suggested.'
  //         },
  //         status: 200,
  //         ok: true,
  //         error: '',
  //       };
  //     }

  //     // The highest rated fixer becomes the leader
  //     const leaderId = selectedFixers[0].userId;
  //     const fixerIds = selectedFixers.map(fixer => fixer.userId);

  //     return {
  //       data: {
  //         fixerIds,
  //         leaderId,
  //         message: `Found ${fixerIds.length} available fixers`
  //       },
  //       status: 200,
  //       ok: true,
  //       error: '',
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       data: { 
  //         fixerIds: [], 
  //         leaderId: null,
  //         message: 'An error occurred while finding available fixers'
  //       },
  //       status: 500,
  //       ok: false,
  //       error: 'Internal server error',
  //     };
  //   }
  // }
}
