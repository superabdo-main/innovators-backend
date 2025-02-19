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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const fixer_service_1 = require("../fixer/fixer.service");
let OrdersService = class OrdersService {
    constructor(prisma, fixerService) {
        this.prisma = prisma;
        this.fixerService = fixerService;
    }
    async create(purchaseId, startDate) {
        try {
            const fixers = await this.fixerService.findAvailableFixers(1, new Date(startDate));
            const order = await this.prisma.orderOperator.create({
                data: {
                    startDate: new Date(startDate),
                    fixers: {
                        connect: fixers.data.fixerIds.map((fixerId) => {
                            return {
                                userId: fixerId,
                            };
                        }),
                    },
                    leaderId: fixers.data.leaderId,
                    purchase: {
                        connect: {
                            id: purchaseId,
                        },
                    },
                },
                include: {
                    fixers: true,
                },
            });
            return { data: order, fixers: fixers, ok: true, status: 200, error: '' };
        }
        catch (error) {
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error accurred while creating the order',
            };
        }
    }
    async getUpcomingOrders(fixerId) {
        try {
            const upcomingOrders = await this.prisma.fixerUser.findFirst({
                where: {
                    userId: fixerId,
                },
                select: {
                    orders: {
                        where: {
                            status: {
                                in: ['OPEN', 'PENDING'],
                            },
                        },
                        include: {
                            purchase: {
                                include: {
                                    issue: true,
                                    items: true,
                                },
                            },
                            fixers: {
                                select: {
                                    id: true,
                                    uuid: true,
                                    userId: true,
                                    isVerified: true,
                                    name: true,
                                    phone: true,
                                    profileImage: true,
                                    professionalLicense: true,
                                    stats: {
                                        select: {
                                            averageRating: true,
                                            completedJobs: true,
                                        },
                                    },
                                },
                            },
                            fixersNotes: true,
                        },
                        orderBy: {
                            startDate: 'asc',
                        },
                    },
                },
            });
            return {
                data: upcomingOrders,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            return { data: {}, ok: false, status: 500, error: 'An error' };
        }
    }
    async getActiveOrder(fixerId) {
        try {
            const activeOrder = await this.prisma.fixerUser.findFirst({
                where: {
                    userId: fixerId,
                },
                select: {
                    activeOrder: {
                        include: {
                            order: {
                                include: {
                                    purchase: {
                                        include: {
                                            issue: true,
                                            items: true,
                                        },
                                    },
                                },
                            },
                            fixers: true,
                            fixersNotes: true,
                        },
                    },
                },
            });
            return {
                data: activeOrder,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            return { data: {}, ok: false, status: 500, error: 'An error' };
        }
    }
    async getCompletedOrders(fixerId) {
        try {
            const completedOrders = await this.prisma.fixerUser.findFirst({
                where: {
                    userId: fixerId,
                },
                select: {
                    orders: {
                        where: {
                            status: 'FINISHED',
                        },
                        include: {
                            purchase: {
                                include: {
                                    issue: true,
                                    items: true,
                                },
                            },
                            fixers: true,
                            fixersNotes: true,
                        },
                    },
                },
            });
            return {
                data: completedOrders,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            return { data: {}, ok: false, status: 500, error: 'An error' };
        }
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        fixer_service_1.FixerService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map