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
let PurchaseService = class PurchaseService {
    constructor(prisma, orderService, tokenService) {
        this.prisma = prisma;
        this.orderService = orderService;
        this.tokenService = tokenService;
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
                    fullname: purchaseData.fullname,
                    phone: purchaseData.phone,
                    address: purchaseData.address,
                    maintenanceDate: purchaseData.maintenanceDate,
                    subTotal: purchaseData.subTotal,
                    discount: purchaseData.discount,
                    total: purchaseData.total,
                    items: {
                        create: purchaseData.items.map((item) => ({
                            itemUUID: item.itemUUID,
                            serviceId: item.serviceId,
                            price: item.price,
                            quantity: item.quantity,
                        })),
                    },
                    malfunctions: {
                        create: purchaseData.malfunctions.map((malfunction) => ({
                            itemUUID: malfunction.itemUUID,
                            serviceId: malfunction.serviceId,
                            description: malfunction.description,
                            imagesUrls: malfunction.imagesUrls,
                        })),
                    },
                },
            });
        }
        catch (error) {
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
        token_jwt_service_1.TokenJwtService])
], PurchaseService);
//# sourceMappingURL=purchase.service.js.map