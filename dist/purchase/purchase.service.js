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
let PurchaseService = class PurchaseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getClosestOrder(id) {
        try {
            const purchase = await this.prisma.purchase.findFirst({
                where: { userId: id, AND: { status: 'OPEN' } },
                orderBy: { date: 'asc' },
            });
            return { data: [purchase], ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while getting the closest order',
            };
        }
    }
    async create(createPurchaseDto) {
        try {
            const { userId, address, date, fullname, issue, items, phone, total } = createPurchaseDto;
            const purchase = await this.prisma.purchase.create({
                data: {
                    address: address,
                    date: new Date(date),
                    fullname: fullname,
                    issue: {
                        createMany: {
                            data: issue,
                        },
                    },
                    items: {
                        createMany: {
                            data: items,
                        },
                    },
                    phone: phone,
                    total: total,
                    userId: userId,
                },
            });
            return { data: purchase, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while creating the purchase',
            };
        }
    }
    async getAllOrders() {
        try {
            const purchase = await this.prisma.purchase.findMany({
                where: {
                    status: "OPEN"
                },
                include: {
                    issue: true,
                    items: true,
                },
            });
            return { data: purchase, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while fetching the purchase',
            };
        }
    }
    async finishOrder(id) {
        try {
            await this.prisma.purchase.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    status: 'FINISHED',
                },
            });
            return { data: {}, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while fetching the purchase',
            };
        }
    }
    async getActiveOrders(id) {
        try {
            const purchase = await this.prisma.purchase.findMany({
                where: {
                    userId: id,
                    AND: {
                        status: 'OPEN',
                    },
                },
                include: {
                    issue: true,
                    items: true,
                },
            });
            return { data: purchase, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while fetching the purchase',
            };
        }
    }
    async getOldOrders(id) {
        try {
            const purchase = await this.prisma.purchase.findMany({
                where: {
                    userId: id,
                    AND: {
                        status: {
                            in: ['CLOSED', 'FINISHED'],
                        },
                    },
                },
                include: {
                    issue: true,
                    items: true,
                },
            });
            return { data: purchase, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while fetching the purchase',
            };
        }
    }
    async cancel(id) {
        try {
            await this.prisma.purchase.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    status: 'CLOSED',
                    closed: true,
                },
            });
            return { data: {}, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: [],
                ok: false,
                error: 'An error occurred while canceling the purchase',
            };
        }
    }
    remove(id) {
        return `This action removes a #${id} purchase`;
    }
};
exports.PurchaseService = PurchaseService;
exports.PurchaseService = PurchaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], PurchaseService);
//# sourceMappingURL=purchase.service.js.map