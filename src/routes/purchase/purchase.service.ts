import { Injectable } from '@nestjs/common';
import { CartItem, CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from 'nestjs-prisma';
import { OrdersService } from 'src/routes/orders/orders.service';
import { TokenJwtService } from 'src/modules/token-jwt/token-jwt.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private orderService: OrdersService,
    private tokenService: TokenJwtService,
  ) {}

  async create(token: string, purchaseData: CreatePurchaseDto) {
    try {
      const clientData = await this.tokenService.decodeToken(token);
      if (!clientData)
        return {
          data: {},
          ok: false,
          status: 401,
          error: 'Invalid token',
        };

      const purchase = await this.prisma.purchase.create({
        data: {
          client: {connect: {id: clientData.id}},
          fullname: purchaseData.fullname,
          phone: purchaseData.phone,
          address: purchaseData.address,
          maintenanceDate: purchaseData.maintenanceDate,
          subTotal: purchaseData.subTotal,
          discount: purchaseData.discount,
          total: purchaseData.total,
          items: {
            create: purchaseData.items.map((item) => ({
              itemUUID: item.itemUUID,
              serviceId: item.serviceId,
              price: item.price,
              quantity: item.quantity,
            })),
          },
          malfunctions: {
            create: purchaseData.malfunctions.map((malfunction) => ({
              itemUUID: malfunction.itemUUID,
              serviceId: malfunction.serviceId,
              description: malfunction.description,
              imagesUrls: malfunction.imagesUrls,
            })),
          },
        },
      });
      

    } catch (error) {
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while creating the purchase',
      };
    }
  }
}
//   async getClosestOrder(id: string) {
//     try {
//       const purchase = await this.prisma.purchase.findFirst({
//         where: { userId: id, AND: { status: 'OPEN' } },
//         orderBy: { date: 'asc' },
//       });
//       return { data: [purchase], ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while getting the closest order',
//       };
//     }
//   }

//   async create(createPurchaseDto: CreatePurchaseDto) {
//     try {
//       const { userId, address, date, fullname, issue, items, phone, total } =
//         createPurchaseDto;

//       let serviceTime = 0;

//       if (items.length > 0) {
//         serviceTime = (await this.getServiceItemsMantainanceTime(items)).data;
//       }

//       const purchase = await this.prisma.purchase.create({
//         data: {
//           address: address,
//           date: new Date(date),
//           fullname: fullname,
//           issue: {
//             createMany: {
//               data: issue,
//             },
//           },
//           items: {
//             createMany: {
//               data: items,
//             },
//           },
//           phone: phone,
//           total: total,
//           userId: userId,
//         },
//       });
//       const order = await this.orderService.create(purchase.id, new Date(date));
//       return { data: order, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while creating the purchase',
//       };
//     }
//   }

//   async getAllOrders() {
//     try {
//       const purchase = await this.prisma.purchase.findMany({
//         where: {
//           status: 'OPEN',
//         },
//         include: {
//           issue: true,
//           items: true,
//         },
//       });
//       return { data: purchase, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while fetching the purchase',
//       };
//     }
//   }

//   async finishOrder(id: string) {
//     try {
//       await this.prisma.purchase.update({
//         where: {
//           id: parseInt(id),
//         },
//         data: {
//           status: 'FINISHED',
//         },
//       });
//       return { data: {}, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while fetching the purchase',
//       };
//     }
//   }

//   async getActiveOrders(id: string) {
//     try {
//       const purchase = await this.prisma.purchase.findMany({
//         where: {
//           userId: id,
//           AND: {
//             status: 'OPEN',
//           },
//         },
//         include: {
//           issue: true,
//           items: true,
//         },
//       });
//       return { data: purchase, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while fetching the purchase',
//       };
//     }
//   }

//   async getOldOrders(id: string) {
//     try {
//       const purchase = await this.prisma.purchase.findMany({
//         where: {
//           userId: id,
//           AND: {
//             status: {
//               in: ['CLOSED', 'FINISHED'],
//             },
//           },
//         },
//         include: {
//           issue: true,
//           items: true,
//         },
//       });
//       return { data: purchase, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while fetching the purchase',
//       };
//     }
//   }

//   async cancel(id: string) {
//     try {
//       await this.prisma.purchase.update({
//         where: {
//           id: parseInt(id),
//         },
//         data: {
//           status: 'CLOSED',
//           closed: true,
//         },
//       });
//       return { data: {}, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: [],
//         ok: false,
//         error: 'An error occurred while canceling the purchase',
//       };
//     }
//   }

//   remove(id: number) {
//     return `This action removes a #${id} purchase`;
//   }

//   async getServiceItemsMantainanceTime(items: CartItem[]) {
//     try {
//       const itemsIds = items.map((item) => parseInt(item.uuid));
//       const time =
//         await this.prisma.playStationFastatServiceOptionItems.aggregate({
//           where: {
//             id: {
//               in: itemsIds,
//             },
//           },
//           _sum: {
//             maintenanceTime: true,
//           },
//         });
//       return { data: time._sum.maintenanceTime, ok: true, error: '' };
//     } catch (error) {
//       return {
//         data: 0,
//         ok: false,
//         error: 'An error occurred while fetching the service item',
//       };
//     }
//   }
// }
