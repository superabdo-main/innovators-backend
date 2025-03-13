import { CouponsService } from './coupons.service';
import { CreateCouponDto, UpdateCouponDto, ValidateCouponDto } from './dto/coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    createCoupon(createCouponDto: CreateCouponDto): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            id: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isGlobal: boolean;
            isActive: boolean;
            discountType: import("@prisma/client").$Enums.DiscountType;
            discountValue: number;
            minOrderValue: number;
            maxDiscountAmount: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usageCount: number;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
    getAllCoupons(): Promise<{
        data: ({
            _count: {
                redemptions: number;
            };
            clients: {
                id: number;
                name: string;
                email: string;
            }[];
        } & {
            id: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isGlobal: boolean;
            isActive: boolean;
            discountType: import("@prisma/client").$Enums.DiscountType;
            discountValue: number;
            minOrderValue: number;
            maxDiscountAmount: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usageCount: number;
        })[];
        ok: boolean;
        status: number;
        error: string;
    }>;
    getCouponByCode(code: string): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            _count: {
                redemptions: number;
            };
            clients: {
                id: number;
                name: string;
                email: string;
            }[];
        } & {
            id: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isGlobal: boolean;
            isActive: boolean;
            discountType: import("@prisma/client").$Enums.DiscountType;
            discountValue: number;
            minOrderValue: number;
            maxDiscountAmount: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usageCount: number;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
    updateCoupon(code: string, updateCouponDto: UpdateCouponDto): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            clients: {
                id: number;
                name: string;
                email: string;
            }[];
        } & {
            id: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            isGlobal: boolean;
            isActive: boolean;
            discountType: import("@prisma/client").$Enums.DiscountType;
            discountValue: number;
            minOrderValue: number;
            maxDiscountAmount: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usageCount: number;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
    deleteCoupon(code: string): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
    validateCoupon(validateCouponDto: ValidateCouponDto): Promise<{
        data: {
            coupon?: undefined;
            discountAmount?: undefined;
            finalPrice?: undefined;
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            coupon: {
                clients: {
                    id: number;
                    name: string | null;
                    uuid: string;
                    password: string | null;
                    phone: string | null;
                    email: string;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                redemptions: {
                    id: number;
                    purchaseId: number | null;
                    clientId: number | null;
                    couponId: number;
                    discountAmount: number;
                    redeemedAt: Date;
                }[];
            } & {
                id: number;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                isGlobal: boolean;
                isActive: boolean;
                discountType: import("@prisma/client").$Enums.DiscountType;
                discountValue: number;
                minOrderValue: number;
                maxDiscountAmount: number | null;
                startDate: Date;
                endDate: Date;
                usageLimit: number | null;
                usageCount: number;
            };
            discountAmount: number;
            finalPrice: number;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
}
