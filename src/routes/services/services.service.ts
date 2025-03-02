import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getMainServices() {
    try {
      const services = await this.prisma.mainServices.findMany({
        where: {
          enabled: true,
        },
        orderBy: {
          sortNumber: 'asc',
        },
      });
      return {
        data: services,
        ok: true,
        status: 200,
        error: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the main services',
          additionalInfo: {
            details: error.message,
            code: 'MAIN_SERVICES_ERROR'
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
