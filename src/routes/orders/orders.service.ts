import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
import { FixerAssignmentService } from '../fixer/fixer-assignment.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private assignmentService: FixerAssignmentService,
  ) {}

  async create(
    purchaseId: number,
    servicesIds: number[],
    workStartDate: Date,
    estimatedDuration: number,
  ) {
    try {
      const fixers = await this.assignmentService.findAvailableFixers(
        servicesIds,
        new Date(workStartDate),
        estimatedDuration,
      );
      // if no avaible fixers send notification to with next available time and send back to client
      // if (!fixers.suggestedFixer) {
      //   return {
      //     data: null,
      //     ok: false,
      //     status: 400,
      //     error: 'No available fixers',
      //   };
      // }
      const order = await this.prisma.orderOperator.create({
        data: {
          leaderId: fixers.suggestedFixer ? fixers.suggestedFixer.fixer.id : undefined,
          fixers: fixers.suggestedFixer ? {
            connect: fixers.suggestedFixer
              ? {
                  id: fixers.suggestedFixer.fixer.id,
                }
              : undefined,
          } : undefined,
          maintenanceStartDate: new Date(workStartDate),
          purchase: {
            connect: {
              id: purchaseId,
            },
          },
          maintenanceDuration: estimatedDuration,
        },
      });
      if (!order) {
        return {
          data: null,
          ok: false,
          status: 400,
          error: 'Failed to create order',
        };
      }
      return {
        data: null,
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create order',
          additionalInfo: {
            details: error.message,
            code: 'ORDER_CREATE_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getClientActiveOrders(clientId: number) {
    try {
      const orders = await this.prisma.orderOperator.findMany({
        where: {
          purchase: {
            clientId: clientId,
          },
          AND: [
            {
              status: 'PENDING',
            },
            {
              status: 'ACTIVE',
            },
          ],
        },
        include: {
          purchase: {
            include: {
              items: true,
              malfunctions: true,
            },
          },
        },
      });
      if (!orders) {
        return {
          data: null,
          ok: false,
          status: 400,
          error: 'No active orders',
        };
      }
      return {
        data: orders,
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get client active orders',
          additionalInfo: {
            details: error.message,
            code: 'ORDER_GET_CLIENT_ACTIVE_ORDERS_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getClientFinishedOrders(clientId: number) {
    try {
      const orders = await this.prisma.orderOperator.findMany({
        where: {
          purchase: {
            clientId: clientId,
          },
          status: {
            in: ['FINISHED', 'CLOSED'],
          },
        },
        include: {
          purchase: {
            include: {
              items: true,
              malfunctions: true,
            },
          },
        },
      });
      if (!orders) {
        return {
          data: null,
          ok: false,
          status: 400,
          error: 'No finished orders',
        };
      }
      return {
        data: orders,
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get client finished orders',
          additionalInfo: {
            details: error.message,
            code: 'ORDER_GET_CLIENT_FINISHED_ORDERS_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
