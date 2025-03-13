import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCouponDto, UpdateCouponDto, ValidateCouponDto, DiscountType } from './dto/coupon.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCoupon(createCouponDto: CreateCouponDto) {
    try {
      // Check if a coupon with this code already exists
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

      // Create coupon
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
    } catch (error) {
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
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return {
        data: [],
        ok: false,
        status: 500,
        error: 'An error occurred while fetching coupons',
      };
    }
  }

  async getCouponByCode(code: string) {
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
    } catch (error) {
      console.error('Error fetching coupon:', error);
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while fetching the coupon',
      };
    }
  }

  async updateCoupon(code: string, updateCouponDto: UpdateCouponDto) {
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

      // Prepare the data for update
      const data: any = { ...updateData };
      
      // Convert date strings to Date objects if provided
      if (updateData.startDate) {
        data.startDate = new Date(updateData.startDate);
      }
      
      if (updateData.endDate) {
        data.endDate = new Date(updateData.endDate);
      }

      // Handle client relationships if clientIds is provided
      if (clientIds !== undefined) {
        data.clients = {
          disconnect: existingCoupon.clients.map(client => ({ id: client.id })),
          connect: clientIds.map(id => ({ id })),
        };
      }

      // Update the coupon
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
    } catch (error) {
      console.error('Error updating coupon:', error);
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while updating the coupon',
      };
    }
  }

  async validateCoupon(validateCouponDto: ValidateCouponDto) {
    try {
      const { code, userId, total } = validateCouponDto;

      // Find the coupon
      const coupon = await this.prisma.coupon.findUnique({
        where: { code },
        include: {
          clients: true,
          redemptions: {
            where: userId ? { clientId: userId } : undefined,
          },
        },
      });

      // Check if coupon exists
      if (!coupon) {
        return {
          data: {},
          ok: false,
          status: 404,
          error: 'Coupon not found',
        };
      }

      // Check if coupon is active
      if (!coupon.isActive) {
        return {
          data: {},
          ok: false,
          status: 400,
          error: 'This coupon is no longer active',
        };
      }

      // Check if coupon is within date range
      const now = new Date();
      if (now < coupon.startDate || now > coupon.endDate) {
        return {
          data: {},
          ok: false,
          status: 400,
          error: 'This coupon is not valid at this time',
        };
      }

      // Check usage limit
      if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
        return {
          data: {},
          ok: false,
          status: 400,
          error: 'This coupon has reached its usage limit',
        };
      }

      // Check if user has already used this coupon
      if (userId && coupon.redemptions.length > 0) {
        return {
          data: {},
          ok: false,
          status: 400,
          error: 'You have already used this coupon',
        };
      }

      // Check if coupon is global or assigned to this user
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

      // Check minimum order value
      if (total < coupon.minOrderValue) {
        return {
          data: {},
          ok: false,
          status: 400,
          error: `This coupon requires a minimum order of ${coupon.minOrderValue}`,
        };
      }

      // Calculate discount amount
      let discountAmount = 0;
      if (coupon.discountType === 'PERCENTAGE') {
        discountAmount = total * (coupon.discountValue / 100);
        // Apply max discount if set
        if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
          discountAmount = coupon.maxDiscountAmount;
        }
      } else {
        // FIXED_AMOUNT
        discountAmount = coupon.discountValue;
        // Ensure discount doesn't exceed order total
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
    } catch (error) {
      console.error('Error validating coupon:', error);
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while validating the coupon',
      };
    }
  }

  async deleteCoupon(code: string) {
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

      // Delete the coupon (relationships will be automatically handled by Prisma)
      await this.prisma.coupon.delete({
        where: { code },
      });

      return {
        data: {},
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      console.error('Error deleting coupon:', error);
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while deleting the coupon',
      };
    }
  }

  async recordCouponRedemption(code: string, clientId: number | null, purchaseId: number, discountAmount: number) {
    try {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code },
      });

      if (!coupon) {
        throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
      }

      // Use a transaction to ensure both operations complete or none do
      return await this.prisma.$transaction(async (prisma) => {
        // Record redemption
        await prisma.couponRedemption.create({
          data: {
            couponId: coupon.id,
            clientId,
            purchaseId,
            discountAmount,
          },
        });

        // Increment usage count
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
    } catch (error) {
      console.error('Error recording coupon redemption:', error);
      return false;
    }
  }
} 