"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FixerAssignmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixerAssignmentService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const client_1 = require("@prisma/client");
let FixerAssignmentService = FixerAssignmentService_1 = class FixerAssignmentService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(FixerAssignmentService_1.name);
        this.MINIMUM_BREAK_MINUTES = 15;
        this.MAX_LOOKUP_HOURS = 24;
        this.TIME_INCREMENT_MINUTES = 30;
    }
    parseTimeString(timeStr) {
        try {
            const [hours, minutes] = timeStr.split(':').map(Number);
            if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                throw new Error('Invalid time format');
            }
            return hours * 60 + minutes;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Invalid time string format: ${timeStr}`);
        }
    }
    formatTimeString(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new common_1.BadRequestException('Invalid date object');
        }
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    isTimeInRange(timeToCheck, startTime, endTime) {
        try {
            const checkMinutes = this.parseTimeString(timeToCheck);
            const startMinutes = this.parseTimeString(startTime);
            const endMinutes = this.parseTimeString(endTime);
            if (startMinutes > endMinutes) {
                return checkMinutes >= startMinutes || checkMinutes <= endMinutes;
            }
            return checkMinutes >= startMinutes && checkMinutes <= endMinutes;
        }
        catch (error) {
            this.logger.error(`Error checking time range: ${error.message}`);
            return false;
        }
    }
    async isFixerAvailable(fixer, workDateTime, endDateTime) {
        try {
            const workTimeStr = this.formatTimeString(workDateTime);
            const endTimeStr = this.formatTimeString(endDateTime);
            if (!fixer.workShift || !this.isTimeInRange(workTimeStr, fixer.workShift.start, fixer.workShift.end)) {
                return false;
            }
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
        }
        catch (error) {
            this.logger.error(`Error checking fixer availability: ${error.message}`);
            return false;
        }
    }
    async findAvailableFixers(serviceIds, workDateTime, estimatedDuration) {
        try {
            if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
                throw new common_1.BadRequestException('Service IDs must be provided');
            }
            if (!(workDateTime instanceof Date) || isNaN(workDateTime.getTime())) {
                throw new common_1.BadRequestException('Invalid work date time');
            }
            if (!Number.isInteger(estimatedDuration) || estimatedDuration <= 0) {
                throw new common_1.BadRequestException('Invalid estimated duration');
            }
            const endDateTime = new Date(workDateTime.getTime() + estimatedDuration * 60 * 1000);
            const workTimeStr = this.formatTimeString(workDateTime);
            const endTimeStr = this.formatTimeString(endDateTime);
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
                                { status: client_1.OperationStatus.PENDING },
                                { status: client_1.OperationStatus.ACTIVE },
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
            const availableFixers = [];
            for (const fixer of potentialFixers) {
                if (!fixer.workShift?.start || !fixer.workShift?.end) {
                    this.logger.debug(`Skipping fixer ${fixer.id} - no work shift defined`);
                    continue;
                }
                const isInShift = this.isTimeInRange(workTimeStr, fixer.workShift.start, fixer.workShift.end);
                if (!isInShift) {
                    this.logger.debug(`Skipping fixer ${fixer.id} - work time outside shift hours`);
                    continue;
                }
                const isEndInShift = this.isTimeInRange(endTimeStr, fixer.workShift.start, fixer.workShift.end);
                const shiftStartMinutes = this.parseTimeString(fixer.workShift.start);
                const shiftEndMinutes = this.parseTimeString(fixer.workShift.end);
                const isOvernightShift = shiftStartMinutes > shiftEndMinutes;
                if (!isOvernightShift && !isEndInShift) {
                    this.logger.debug(`Skipping fixer ${fixer.id} - end time outside shift hours`);
                    continue;
                }
                if (await this.isFixerAvailable(fixer, workDateTime, endDateTime)) {
                    const score = this.calculateFixerScore(fixer);
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
            availableFixers.sort((a, b) => b.score - a.score);
            return {
                availableFixers,
                suggestedFixer: availableFixers[0],
            };
        }
        catch (error) {
            this.logger.error('Error finding available fixers:', error);
            throw error;
        }
    }
    async findNextAvailableTime(serviceIds, startTime) {
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
                                { status: client_1.OperationStatus.PENDING },
                                { status: client_1.OperationStatus.ACTIVE },
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
            if (qualifiedFixers.length === 0)
                return null;
            let earliestTime = startTime;
            let found = false;
            const maxAttempts = (this.MAX_LOOKUP_HOURS * 60) / this.TIME_INCREMENT_MINUTES;
            let attempts = 0;
            while (!found && attempts < maxAttempts) {
                for (const fixer of qualifiedFixers) {
                    if (await this.isFixerAvailable(fixer, earliestTime, new Date(earliestTime.getTime() + 60 * 60 * 1000))) {
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
        }
        catch (error) {
            this.logger.error('Error finding next available time:', error);
            return null;
        }
    }
    calculateFixerScore(fixer) {
        try {
            let score = 0;
            if (fixer.stats) {
                const experienceScore = Math.min(fixer.stats.monthsOfExperience * 0.5, 20);
                score += experienceScore;
                const ratingScore = (fixer.stats.averageRating / 5) * 30;
                score += ratingScore;
                const completedJobsScore = Math.min(fixer.stats.completedJobs * 0.2, 20);
                score += completedJobsScore;
            }
            if (fixer.isVerified)
                score += 15;
            if (fixer.idCardApproved)
                score += 15;
            return Math.round(score);
        }
        catch (error) {
            this.logger.error(`Error calculating fixer score: ${error.message}`);
            return 0;
        }
    }
    async assignFixerToOrder(orderId, fixerId, startTime, estimatedDuration) {
        try {
            const endTime = new Date(startTime.getTime() + estimatedDuration * 60 * 1000);
            await this.prisma.orderOperator.update({
                where: { id: orderId },
                data: {
                    fixers: {
                        connect: { id: fixerId },
                    },
                    leaderId: fixerId,
                    startTime,
                    endTime,
                    status: client_1.OperationStatus.PENDING,
                },
            });
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
        }
        catch (error) {
            this.logger.error('Error assigning fixer to order:', error);
            throw error;
        }
    }
};
exports.FixerAssignmentService = FixerAssignmentService;
exports.FixerAssignmentService = FixerAssignmentService = FixerAssignmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], FixerAssignmentService);
//# sourceMappingURL=fixer-assignment.service.js.map