import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
import { FixerService } from 'src/routes/fixer/fixer.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private fixerService: FixerService,
  ) {}

  async create(purchaseId: number, startDate: Date) {
    try {
      // const fixers = await this.fixerService.findAvailableFixers(
      //   1,
      //   new Date(startDate),
      // );
      // const order = await this.prisma.orderOperator.create({
      //   data: {
      //     startDate: new Date(startDate),
      //     fixers: {
      //       connect: fixers.data.fixerIds.map((fixerId: any) => {
      //         return {
      //           userId: fixerId,
      //         };
      //       }),
      //     },
      //     leaderId: fixers.data.leaderId,
      //     purchase: {
      //       connect: {
      //         id: purchaseId,
      //       },
      //     },
      //   },
      //   include: {
      //     fixers: true,
      //   },
      // });

      // return { data: order, fixers: fixers, ok: true, status: 200, error: '' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to create order',
          additionalInfo: {
            details: error.message,
            code: 'ORDER_CREATE_ERROR'
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async getUpcomingOrders(fixerId: string) {
  //   try {
  //     const upcomingOrders = await this.prisma.fixerUser.findFirst({
  //       where: {
  //         userId: fixerId,
  //       },
  //       select: {
  //         orders: {
  //           where: {
  //             status: {
  //               in: ['OPEN', 'PENDING'],
  //             },
  //           },
  //           include: {
  //             purchase: {
  //               include: {
  //                 issue: true,
  //                 items: true,
  //               },
  //             },
  //             fixers: {
  //               select: {
  //                 id: true,
  //                 uuid: true,
  //                 userId: true,
  //                 isVerified: true,
  //                 name: true,
  //                 phone: true,
  //                 profileImage: true,
  //                 professionalLicense: true,
  //                 stats: {
  //                   select: {
  //                     averageRating: true,
  //                     completedJobs: true,
  //                   },
  //                 },
  //               },
  //             },
  //             fixersNotes: true,
  //           },
  //           orderBy: {
  //             startDate: 'asc',
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       data: upcomingOrders,
  //       ok: true,
  //       status: 200,
  //       error: '',
  //     };
  //   } catch (error) {
  //     return { data: {}, ok: false, status: 500, error: 'An error' };
  //   }
  // }

  // async getActiveOrder(fixerId: string) {
  //   try {
  //     const activeOrder = await this.prisma.fixerUser.findFirst({
  //       where: {
  //         userId: fixerId,
  //       },
  //       select: {
  //         activeOrder: {
  //           include: {
  //             order: {
  //               include: {
  //                 purchase: {
  //                   include: {
  //                     issue: true,
  //                     items: true,
  //                   },
  //                 },
  //               },
  //             },
  //             fixers: true,
  //             fixersNotes: true,
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       data: activeOrder,
  //       ok: true,
  //       status: 200,
  //       error: '',
  //     };
  //   } catch (error) {
  //     return { data: {}, ok: false, status: 500, error: 'An error' };
  //   }
  // }

  // async getCompletedOrders(fixerId: string) {
  //   try {
  //     const completedOrders = await this.prisma.fixerUser.findFirst({
  //       where: {
  //         userId: fixerId,
  //       },
  //       select: {
  //         orders: {
  //           where: {
  //             status: 'FINISHED',
  //           },
  //           include: {
  //             purchase: {
  //               include: {
  //                 issue: true,
  //                 items: true,
  //               },
  //             },
  //             fixers: true,
  //             fixersNotes: true,
  //           },
  //         },
  //       },
  //     });

  //     return {
  //       data: completedOrders,
  //       ok: true,
  //       status: 200,
  //       error: '',
  //     };
  //   } catch (error) {
  //     return { data: {}, ok: false, status: 500, error: 'An error' };
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
