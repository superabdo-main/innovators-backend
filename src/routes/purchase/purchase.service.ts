import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartItem, CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from 'nestjs-prisma';
import { OrdersService } from 'src/routes/orders/orders.service';
import { TokenJwtService } from 'src/modules/token-jwt/token-jwt.service';
import { MaintenanceTimePredictionService } from '../maintenance/maintenance-time.service';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private orderService: OrdersService,
    private tokenService: TokenJwtService,
    private maintenanceTimeService: MaintenanceTimePredictionService,
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
        
        // Convert the date string to a Date object while preserving local time
        const maintenanceDate = new Date(purchaseData.maintenanceDate);
        maintenanceDate.setHours(maintenanceDate.getHours() + 2);
        purchaseData.maintenanceDate = maintenanceDate;
        
        
      const purchase = await this.prisma.purchase.create({
        data: {
          client: { connect: { id: clientData.id } },
          fullname: purchaseData.fullname || null,
          phone: purchaseData.phone || null,
          address: purchaseData.address || null,
          maintenanceDate: new Date(purchaseData.maintenanceDate) || null,
          subTotal: purchaseData.subTotal || null,
          discount: purchaseData.discount || null,
          total: purchaseData.total || null,
          items: purchaseData.items ? {
            create: purchaseData.items.map((item) => ({
              itemUUID: parseInt(item.itemUUID.toString()) || null,
              itemName: item.itemName || null,
              serviceId: item.serviceId || null,
              price: item.price || null,
              quantity: item.quantity || null,
            })),
          } : undefined,
          malfunctions: purchaseData.malfunctions ? {
            create: purchaseData.malfunctions.map((malfunction) => ({
              itemUUID: parseInt(malfunction.itemUUID.toString()) || null,
              serviceId: malfunction.serviceId || null,
              description: malfunction.description || null,
              imagesUrls: malfunction.imagesUrls || null,
            })),
          } : undefined,
        },
        select: {
          id: true,
        },
      });
      if (purchase) {
        const servicesIds = [
          ...(purchaseData.items?.map((item) => item?.serviceId) || []),
          ...(purchaseData.malfunctions?.map(
            (malfunction) => malfunction?.serviceId,
          ) || []),
        ].filter(id => id !== null && id !== undefined);
        const estimatedDuration =
          await this.maintenanceTimeService.predictMaintenanceTime(
            purchaseData.items.map((item) => item.itemUUID),
          );
        if (estimatedDuration) {
          const order = await this.orderService.create(
            purchase.id,
            servicesIds,
            new Date(purchaseData.maintenanceDate),
            estimatedDuration,
          );
          if (order) {
            return {
              data: order,
              ok: true,
              status: 201,
              error: '',
            };
          }else{
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while creating the order',
                additionalInfo: {
                  details: null,
                  code: 'ORDER_CREATION_ERROR',
                },
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        } else {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'An error occurred while predicting the maintenance time',
              additionalInfo: {
                details: null,
                code: 'MAINTENANCE_TIME_PREDICTION_ERROR',
              },
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'An error occurred while creating the purchase',
            additionalInfo: {
              details: null,
              code: 'PURCHASE_ERROR',
            },
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.log(error);
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
