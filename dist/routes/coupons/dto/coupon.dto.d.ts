export declare enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    FIXED_AMOUNT = "FIXED_AMOUNT"
}
export declare class CreateCouponDto {
    code: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    minOrderValue?: number;
    maxDiscountAmount?: number;
    startDate: string;
    endDate: string;
    usageLimit?: number;
    isGlobal?: boolean;
    clientIds?: number[];
}
export declare class ValidateCouponDto {
    code: string;
    userId?: number;
    total: number;
}
export declare class UpdateCouponDto {
    description?: string;
    discountType?: DiscountType;
    discountValue?: number;
    minOrderValue?: number;
    maxDiscountAmount?: number;
    startDate?: string;
    endDate?: string;
    usageLimit?: number;
    isActive?: boolean;
    isGlobal?: boolean;
    clientIds?: number[];
}
