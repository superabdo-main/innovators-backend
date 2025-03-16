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
const fixer_assignment_service_1 = require("../fixer/fixer-assignment.service");
let OrdersService = class OrdersService {
    constructor(prisma, assignmentService) {
        this.prisma = prisma;
        this.assignmentService = assignmentService;
    }
    async create(purchaseId, servicesIds, workStartDate, estimatedDuration) {
        try {
            const fixers = await this.assignmentService.findAvailableFixers(servicesIds, workStartDate, estimatedDuration);
            const order = await this.prisma.orderOperator.create({
                data: {
                    leaderId: fixers.suggestedFixer ? fixers.suggestedFixer.fixer.id : undefined,
                    fixers: fixers.suggestedFixer ? {
                        connect: fixers.suggestedFixer
                            ? {
                                id: fixers.suggestedFixer.fixer.id,
                            }
                            : undefined,
                    } : undefined,
                    maintenanceStartDate: workStartDate,
                    purchase: {
                        connect: {
                            id: purchaseId,
                        },
                    },
                    maintenanceDuration: estimatedDuration,
                    startTime: workStartDate,
                    endTime: new Date(workStartDate.getTime() + estimatedDuration * 60000),
                },
            });
            if (!order) {
                return {
                    data: null,
                    ok: false,
                    status: 400,
                    error: 'Failed to create order',
                };
            }
            return {
                data: null,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to create order',
                additionalInfo: {
                    details: error.message,
                    code: 'ORDER_CREATE_ERROR',
                },
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getClientActiveOrders(clientId) {
        try {
            const orders = await this.prisma.orderOperator.findMany({
                where: {
                    purchase: {
                        clientId: clientId,
                    },
                    status: {
                        in: ['PENDING', 'ACTIVE'],
                    },
                },
                include: {
                    purchase: {
                        include: {
                            items: true,
                            malfunctions: true,
                        },
                    },
                    fixers: true,
                    fixersNotes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!orders || orders.length === 0) {
                return {
                    data: [],
                    ok: true,
                    status: 200,
                    error: '',
                };
            }
            return {
                data: orders,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to get client active orders',
                additionalInfo: {
                    details: error.message,
                    code: 'ORDER_GET_CLIENT_ACTIVE_ORDERS_ERROR',
                },
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getClientFinishedOrders(clientId) {
        try {
            const orders = await this.prisma.orderOperator.findMany({
                where: {
                    purchase: {
                        clientId: clientId,
                    },
                    status: {
                        in: ['FINISHED', 'CLOSED'],
                    },
                },
                include: {
                    purchase: {
                        include: {
                            items: true,
                            malfunctions: true,
                        },
                    },
                    fixers: true,
                    fixersNotes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!orders || orders.length === 0) {
                return {
                    data: [],
                    ok: true,
                    status: 200,
                    error: '',
                };
            }
            return {
                data: orders,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to get client finished orders',
                additionalInfo: {
                    details: error.message,
                    code: 'ORDER_GET_CLIENT_FINISHED_ORDERS_ERROR',
                },
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        fixer_assignment_service_1.FixerAssignmentService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map