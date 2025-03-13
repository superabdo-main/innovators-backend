import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class OffersService {
  constructor(private readonly prisma: PrismaService) {}

  async getBanners() {
    try {
      const banners = await this.prisma.imagesBanner.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { data: banners, ok: true, status: 200, error: '' };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
