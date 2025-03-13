import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto, UpdateCouponDto, ValidateCouponDto } from './dto/coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.createCoupon(createCouponDto);
  }

  @Get()
  async getAllCoupons() {
    return this.couponsService.getAllCoupons();
  }

  @Get(':code')
  async getCouponByCode(@Param('code') code: string) {
    return this.couponsService.getCouponByCode(code);
  }

  @Put(':code')
  async updateCoupon(
    @Param('code') code: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponsService.updateCoupon(code, updateCouponDto);
  }

  @Delete(':code')
  async deleteCoupon(@Param('code') code: string) {
    return this.couponsService.deleteCoupon(code);
  }

  @Post('validate')
  async validateCoupon(@Body() validateCouponDto: ValidateCouponDto) {
    return this.couponsService.validateCoupon(validateCouponDto);
  }
} 