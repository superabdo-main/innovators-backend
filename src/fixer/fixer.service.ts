import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FixerService {
  constructor(private prisma: PrismaService) {}

  async fetchFixerData(id: number) {
    try {
      const fixer = await this.prisma.fixerUser.findUnique({
        where: { id },
        include: {
          balance: true,
          idCard: true,
          stats: true,
          activeOrder: true,
          orders: {
            take: 5,
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      if (!fixer) {
        return {
          data: {},
          status: 404,
          ok: false,
          error: 'Fixer not found',
        };
      }

      const { password, ...result } = fixer;
      return {
        data: result,
        status: 200,
        ok: true,
        error: '',
      };
    } catch (error) {
      console.error(error);
      return {
        data: {},
        status: 500,
        ok: false,
        error: 'Internal server error',
      };
    }
  }
}
