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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let CouponsService = class CouponsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCoupon(createCouponDto) {
        try {
            const existingCoupon = await this.prisma.coupon.findUnique({
                where: { code: createCouponDto.code },
            });
            if (existingCoupon) {
                return {
                    data: {},
                    ok: false,
                    status: 400,
                    error: 'A coupon with this code already exists',
                };
            }
            const { clientIds, ...couponData } = createCouponDto;
            const coupon = await this.prisma.coupon.create({
                data: {
                    ...couponData,
                    startDate: new Date(couponData.startDate),
                    endDate: new Date(couponData.endDate),
                    usageCount: 0,
                    isActive: couponData['isActive'] !== undefined ? !!couponData['isActive'] : true,
                    isGlobal: couponData['isGlobal'] !== undefined ? !!couponData['isGlobal'] : false,
                    clients: clientIds && clientIds.length > 0
                        ? {
                            connect: clientIds.map(id => ({ id })),
                        }
                        : undefined,
                },
            });
            return {
                data: coupon,
                ok: true,
                status: 201,
                error: '',
            };
        }
        catch (error) {
            console.error('Error creating coupon:', error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while creating the coupon',
            };
        }
    }
    async getAllCoupons() {
        try {
            const coupons = await this.prisma.coupon.findMany({
                include: {
                    clients: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    _count: {
                        select: {
                            redemptions: true,
                        },
                    },
                },
            });
            return {
                data: coupons,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            console.error('Error fetching coupons:', error);
            return {
                data: [],
                ok: false,
                status: 500,
                error: 'An error occurred while fetching coupons',
            };
        }
    }
    async getCouponByCode(code) {
        try {
            const coupon = await this.prisma.coupon.findUnique({
                where: { code },
                include: {
                    clients: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    _count: {
                        select: {
                            redemptions: true,
                        },
                    },
                },
            });
            if (!coupon) {
                return {
                    data: {},
                    ok: false,
                    status: 404,
                    error: 'Coupon not found',
                };
            }
            return {
                data: coupon,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            console.error('Error fetching coupon:', error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while fetching the coupon',
            };
        }
    }
    async updateCoupon(code, updateCouponDto) {
        try {
            const existingCoupon = await this.prisma.coupon.findUnique({
                where: { code },
                include: { clients: true },
            });
            if (!existingCoupon) {
                return {
                    data: {},
                    ok: false,
                    status: 404,
                    error: 'Coupon not found',
                };
            }
            const { clientIds, ...updateData } = updateCouponDto;
            const data = { ...updateData };
            if (updateData.startDate) {
                data.startDate = new Date(updateData.startDate);
            }
            if (updateData.endDate) {
                data.endDate = new Date(updateData.endDate);
            }
            if (clientIds !== undefined) {
                data.clients = {
                    disconnect: existingCoupon.clients.map(client => ({ id: client.id })),
                    connect: clientIds.map(id => ({ id })),
                };
            }
            const updatedCoupon = await this.prisma.coupon.update({
                where: { code },
                data,
                include: {
                    clients: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    },
                },
            });
            return {
                data: updatedCoupon,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            console.error('Error updating coupon:', error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while updating the coupon',
            };
        }
    }
    async validateCoupon(validateCouponDto) {
        try {
            const { code, userId, total } = validateCouponDto;
            const coupon = await this.prisma.coupon.findUnique({
                where: { code },
                include: {
                    clients: true,
                    redemptions: {
                        where: userId ? { clientId: userId } : undefined,
                    },
                },
            });
            if (!coupon) {
                return {
                    data: {},
                    ok: false,
                    status: 404,
                    error: 'Coupon not found',
                };
            }
            if (!coupon.isActive) {
                return {
                    data: {},
                    ok: false,
                    status: 400,
                    error: 'This coupon is no longer active',
                };
            }
            const now = new Date();
            if (now < coupon.startDate || now > coupon.endDate) {
                return {
                    data: {},
                    ok: false,
                    status: 400,
                    error: 'This coupon is not valid at this time',
                };
            }
            if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
                return {
                    data: {},
                    ok: false,
                    status: 400,
                    error: 'This coupon has reached its usage limit',
                };
            }
            if (userId && coupon.redemptions.length > 0) {
                return {
                    data: {},
                    ok: false,
                    status: 400,
                    error: 'You have already used this coupon',
                };
            }
            if (!coupon.isGlobal && userId) {
                const isAssignedToUser = coupon.clients.some(client => client.id === userId);
                if (!isAssignedToUser) {
                    return {
                        data: {},
                        ok: false,
                        status: 400,
                        error: 'This coupon is not valid for your account',
                    };
                }
            }
            if (total < coupon.minOrderValue) {
                return {
                    data: {},
                    ok: false,
                    status: 400,
                    error: `This coupon requires a minimum order of ${coupon.minOrderValue}`,
                };
            }
            let discountAmount = 0;
            if (coupon.discountType === 'PERCENTAGE') {
                discountAmount = total * (coupon.discountValue / 100);
                if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
                    discountAmount = coupon.maxDiscountAmount;
                }
            }
            else {
                discountAmount = coupon.discountValue;
                if (discountAmount > total) {
                    discountAmount = total;
                }
            }
            return {
                data: {
                    coupon,
                    discountAmount,
                    finalPrice: total - discountAmount,
                },
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            console.error('Error validating coupon:', error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while validating the coupon',
            };
        }
    }
    async deleteCoupon(code) {
        try {
            const existingCoupon = await this.prisma.coupon.findUnique({
                where: { code },
            });
            if (!existingCoupon) {
                return {
                    data: {},
                    ok: false,
                    status: 404,
                    error: 'Coupon not found',
                };
            }
            await this.prisma.coupon.delete({
                where: { code },
            });
            return {
                data: {},
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            console.error('Error deleting coupon:', error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while deleting the coupon',
            };
        }
    }
    async recordCouponRedemption(code, clientId, purchaseId, discountAmount) {
        try {
            const coupon = await this.prisma.coupon.findUnique({
                where: { code },
            });
            if (!coupon) {
                throw new common_1.HttpException('Coupon not found', common_1.HttpStatus.NOT_FOUND);
            }
            return await this.prisma.$transaction(async (prisma) => {
                await prisma.couponRedemption.create({
                    data: {
                        couponId: coupon.id,
                        clientId,
                        purchaseId,
                        discountAmount,
                    },
                });
                await prisma.coupon.update({
                    where: { id: coupon.id },
                    data: {
                        usageCount: {
                            increment: 1
                        },
                    },
                });
                return true;
            });
        }
        catch (error) {
            console.error('Error recording coupon redemption:', error);
            return false;
        }
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map