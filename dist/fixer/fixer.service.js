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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixerService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let FixerService = class FixerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchFixerData(id) {
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
        }
        catch (error) {
            console.error(error);
            return {
                data: {},
                status: 500,
                ok: false,
                error: 'Internal server error',
            };
        }
    }
    async findAvailableFixers(number, startDate) {
        try {
            console.log(startDate);
            const availableFixers = await this.prisma.fixerUser.findMany({
                where: {
                    activeOrder: null,
                    orders: {
                        none: {
                            startDate: {
                                gte: startDate,
                                lte: new Date(startDate.getTime() + 1 * 60 * 60 * 1000)
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    userId: true,
                    stats: {
                        select: {
                            averageRating: true,
                            completedJobs: true,
                        }
                    },
                    orders: {
                        where: {
                            startDate: {
                                gte: startDate
                            }
                        },
                        select: {
                            startDate: true
                        }
                    }
                },
                orderBy: [
                    { stats: { averageRating: 'desc' } },
                    { stats: { completedJobs: 'desc' } }
                ]
            });
            if (availableFixers.length === 0) {
                const nextAvailableTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
                return {
                    data: {
                        fixerIds: [],
                        leaderId: null,
                        nextAvailableTime,
                        message: 'No fixers available at requested time. Next available time slot suggested.'
                    },
                    status: 200,
                    ok: true,
                    error: '',
                };
            }
            const scheduledFixers = availableFixers.filter(fixer => {
                const hasConflict = fixer.orders.some(order => {
                    const orderTime = new Date(order.startDate).getTime();
                    const requestedTime = startDate.getTime();
                    return Math.abs(orderTime - requestedTime) < 2 * 60 * 60 * 1000;
                });
                return !hasConflict;
            });
            scheduledFixers.sort((a, b) => {
                const ratingA = a.stats?.averageRating || 0;
                const ratingB = b.stats?.averageRating || 0;
                const jobsA = a.stats?.completedJobs || 0;
                const jobsB = b.stats?.completedJobs || 0;
                if (ratingA !== ratingB)
                    return ratingB - ratingA;
                return jobsB - jobsA;
            });
            const selectedFixers = scheduledFixers.slice(0, Math.min(number, scheduledFixers.length));
            if (selectedFixers.length === 0) {
                const nextAvailableTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
                return {
                    data: {
                        fixerIds: [],
                        leaderId: null,
                        nextAvailableTime,
                        message: 'All available fixers have schedule conflicts. Next time slot suggested.'
                    },
                    status: 200,
                    ok: true,
                    error: '',
                };
            }
            const leaderId = selectedFixers[0].userId;
            const fixerIds = selectedFixers.map(fixer => fixer.userId);
            return {
                data: {
                    fixerIds,
                    leaderId,
                    message: `Found ${fixerIds.length} available fixers`
                },
                status: 200,
                ok: true,
                error: '',
            };
        }
        catch (error) {
            console.error(error);
            return {
                data: {
                    fixerIds: [],
                    leaderId: null,
                    message: 'An error occurred while finding available fixers'
                },
                status: 500,
                ok: false,
                error: 'Internal server error',
            };
        }
    }
};
exports.FixerService = FixerService;
exports.FixerService = FixerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], FixerService);
//# sourceMappingURL=fixer.service.js.map