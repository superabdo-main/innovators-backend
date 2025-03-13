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
exports.PurchaseService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const orders_service_1 = require("../orders/orders.service");
const token_jwt_service_1 = require("../../modules/token-jwt/token-jwt.service");
const maintenance_time_service_1 = require("../maintenance/maintenance-time.service");
let PurchaseService = class PurchaseService {
    constructor(prisma, orderService, tokenService, maintenanceTimeService) {
        this.prisma = prisma;
        this.orderService = orderService;
        this.tokenService = tokenService;
        this.maintenanceTimeService = maintenanceTimeService;
    }
    async create(token, purchaseData) {
        try {
            const clientData = await this.tokenService.decodeToken(token);
            if (!clientData)
                return {
                    data: {},
                    ok: false,
                    status: 401,
                    error: 'Invalid token',
                };
            const purchase = await this.prisma.purchase.create({
                data: {
                    client: { connect: { id: clientData.id } },
                    fullname: purchaseData.fullname || null,
                    phone: purchaseData.phone || null,
                    address: purchaseData.address || null,
                    maintenanceDate: new Date(purchaseData.maintenanceDate) || null,
                    subTotal: purchaseData.subTotal || null,
                    discount: purchaseData.discount || null,
                    total: purchaseData.total || null,
                    items: purchaseData.items ? {
                        create: purchaseData.items.map((item) => ({
                            itemUUID: parseInt(item.itemUUID.toString()) || null,
                            serviceId: item.serviceId || null,
                            price: item.price || null,
                            quantity: item.quantity || null,
                        })),
                    } : undefined,
                    malfunctions: purchaseData.malfunctions ? {
                        create: purchaseData.malfunctions.map((malfunction) => ({
                            itemUUID: parseInt(malfunction.itemUUID.toString()) || null,
                            serviceId: malfunction.serviceId || null,
                            description: malfunction.description || null,
                            imagesUrls: malfunction.imagesUrls || null,
                        })),
                    } : undefined,
                },
                select: {
                    id: true,
                },
            });
            if (purchase) {
                const servicesIds = [
                    ...(purchaseData.items?.map((item) => item?.serviceId) || []),
                    ...(purchaseData.malfunctions?.map((malfunction) => malfunction?.serviceId) || []),
                ].filter(id => id !== null && id !== undefined);
                const estimatedDuration = await this.maintenanceTimeService.predictMaintenanceTime(purchaseData.items.map((item) => item.itemUUID));
                if (estimatedDuration) {
                    const order = await this.orderService.create(purchase.id, servicesIds, purchaseData.maintenanceDate, estimatedDuration);
                    if (order) {
                        return {
                            data: order,
                            ok: true,
                            status: 201,
                            error: '',
                        };
                    }
                    else {
                        throw new common_1.HttpException({
                            status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                            error: 'An error occurred while creating the order',
                            additionalInfo: {
                                details: null,
                                code: 'ORDER_CREATION_ERROR',
                            },
                        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                else {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        error: 'An error occurred while predicting the maintenance time',
                        additionalInfo: {
                            details: null,
                            code: 'MAINTENANCE_TIME_PREDICTION_ERROR',
                        },
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'An error occurred while creating the purchase',
                    additionalInfo: {
                        details: null,
                        code: 'PURCHASE_ERROR',
                    },
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            console.log(error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while creating the purchase',
            };
        }
    }
};
exports.PurchaseService = PurchaseService;
exports.PurchaseService = PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        orders_service_1.OrdersService,
        token_jwt_service_1.TokenJwtService,
        maintenance_time_service_1.MaintenanceTimePredictionService])
], PurchaseService);
//# sourceMappingURL=purchase.service.js.map