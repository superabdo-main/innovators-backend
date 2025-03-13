import { IsString, IsOptional, IsBoolean, IsNumber, IsDate, IsEnum, IsArray, IsPositive, Min, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsNumber()
  @IsPositive()
  discountValue: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderValue?: number = 0;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxDiscountAmount?: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean = false;

  @IsOptional()
  @IsArray()
  clientIds?: number[];
}

export class ValidateCouponDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsNumber()
  @Min(0)
  total: number;
}

export class UpdateCouponDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(DiscountType)
  discountType?: DiscountType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  discountValue?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minOrderValue?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxDiscountAmount?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @IsOptional()
  @IsArray()
  clientIds?: number[];
} 