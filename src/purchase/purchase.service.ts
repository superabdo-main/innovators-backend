import { Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}


  async getClosestOrder(id: string) {
    try {
      const purchase = await this.prisma.purchase.findFirst({
        where: { userId: id, AND: { status: 'OPEN' } },
        orderBy: { date: 'asc' },
      });
      return { data: [purchase], ok: true, error: '' };
    } catch (error) {
      return {
        data: [],
        ok: false,
        error: 'An error occurred while getting the closest order',
      };
    }
  }

  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      const { userId, address, date, fullname, issue, items, phone, total } =
        createPurchaseDto;
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
    } catch (error) {
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
    } catch (error) {
      return {
        data: [],
        ok: false,
        error: 'An error occurred while fetching the purchase',
      };
    }
  }

  async finishOrder(id: string) {
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
    } catch (error) {
      return {
        data: [],
        ok: false,
        error: 'An error occurred while fetching the purchase',
      };
    }
  }

  async getActiveOrders(id: string) {
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
    } catch (error) {
      return {
        data: [],
        ok: false,
        error: 'An error occurred while fetching the purchase',
      };
    }
  }

  async getOldOrders(id: string) {
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
    } catch (error) {
      return {
        data: [],
        ok: false,
        error: 'An error occurred while fetching the purchase',
      };
    }
  }

  async cancel(id: string) {
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
    } catch (error) {
      return {
        data: [],
        ok: false,
        error: 'An error occurred while canceling the purchase',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
