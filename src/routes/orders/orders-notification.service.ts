import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { NotificationService } from '../../modules/notifications/notification.service';
import { NotificationResponseDto, NotificationTimeThreshold, OrderNotificationResponseDto } from './dto/order-notification.dto';

@Injectable()
export class OrdersNotificationService {
  private readonly logger = new Logger(OrdersNotificationService.name);

  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  /**
   * Check for upcoming orders and send notifications
   * based on time thresholds (1 hour and 10 minutes)
   */
  async checkAndSendUpcomingOrderNotifications(): Promise<NotificationResponseDto> {
    try {
      this.logger.debug('Checking for upcoming orders to send notifications...');
      
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      
      // Find orders that are coming up within the next hour
      const upcomingOrders = await this.prisma.orderOperator.findMany({
        where: {
          maintenanceStartDate: {
            gte: now,
            lte: oneHourFromNow,
          },
          status: 'PENDING',
        },
        include: {
          purchase: {
            include: {
              client: true,
            },
          },
        },
      });

      const notificationResults: OrderNotificationResponseDto[] = [];

      for (const order of upcomingOrders) {
        const clientId = order.purchase?.client?.id;
        if (!clientId) continue;

        const timeDiff = order.maintenanceStartDate.getTime() - now.getTime();
        const minutesUntilOrder = Math.floor(timeDiff / (60 * 1000));
        
        // 1-hour notification (between 58-62 minutes before)
        if (minutesUntilOrder >= 58 && minutesUntilOrder <= 62) {
          const result = await this.sendOrderNotification(
            order,
            clientId,
            NotificationTimeThreshold.ONE_HOUR,
            `Your order #${order.id} is scheduled in 1 hour. Please get ready.`,
          );
          notificationResults.push(result);
        }
        
        // 10-minute notification (between 8-12 minutes before)
        if (minutesUntilOrder >= 8 && minutesUntilOrder <= 12) {
          const result = await this.sendOrderNotification(
            order,
            clientId,
            NotificationTimeThreshold.TEN_MINUTES,
            `Your order #${order.id} is coming up in 10 minutes! Our technician will arrive shortly.`,
          );
          notificationResults.push(result);
        }
      }

      return {
        data: notificationResults,
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      this.logger.error(
        `Error while sending upcoming order notifications: ${error.message}`,
        error.stack,
      );
      
      return {
        data: null,
        ok: false,
        status: 500,
        error: 'Failed to send notifications',
      };
    }
  }

  /**
   * Send a notification for an order at a specific time threshold
   * @param timeThreshold '1-hour' or '10-minutes'
   * @param orderId The order ID to send notification for
   */
  async sendSpecificNotification(
    timeThreshold: NotificationTimeThreshold,
    orderId: number,
  ): Promise<NotificationResponseDto> {
    try {
      const order = await this.prisma.orderOperator.findUnique({
        where: { id: orderId },
        include: {
          purchase: {
            include: {
              client: true,
            },
          },
        },
      });

      if (!order) {
        return {
          data: null,
          ok: false,
          status: 404,
          error: `Order #${orderId} not found`,
        };
      }

      const clientId = order.purchase?.client?.id;
      if (!clientId) {
        return {
          data: null,
          ok: false,
          status: 400,
          error: 'Client information not found for this order',
        };
      }

      let message = '';
      if (timeThreshold === NotificationTimeThreshold.ONE_HOUR) {
        message = `Your order #${order.id} is scheduled in 1 hour. Please get ready.`;
      } else if (timeThreshold === NotificationTimeThreshold.TEN_MINUTES) {
        message = `Your order #${order.id} is coming up in 10 minutes! Our technician will arrive shortly.`;
      } else {
        return {
          data: null,
          ok: false,
          status: 400,
          error: 'Invalid time threshold. Use "1-hour" or "10-minutes"',
        };
      }

      const result = await this.sendOrderNotification(
        order,
        clientId,
        timeThreshold,
        message,
      );

      return {
        data: result,
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      this.logger.error(
        `Error sending ${timeThreshold} notification for order #${orderId}: ${error.message}`,
        error.stack,
      );
      
      return {
        data: null,
        ok: false,
        status: 500,
        error: `Failed to send ${timeThreshold} notification for order #${orderId}`,
      };
    }
  }

  /**
   * Send notification to a client about an upcoming order
   */
  private async sendOrderNotification(
    order: any,
    clientId: number,
    timeWindow: string,
    message: string,
  ): Promise<OrderNotificationResponseDto> {
    try {
      // Create the notification data
      const notificationData = {
        title: `Upcoming Order Reminder`,
        body: message,
        isGlobal: false,
        recipientId: clientId,
        // data: {
        //   type: 'upcoming_order',
        //   orderId: order.id,
        //   timeWindow,
        //   purchaseId: order.purchase.id,
        // },
      };

      // Send the notification
      const notification = await this.notificationService.createNotification(notificationData);
      
      this.logger.log(
        `Sent ${timeWindow} notification for order #${order.id} to client #${clientId}`,
      );
      
      return {
        orderId: order.id,
        clientId: clientId,
        timeWindow: timeWindow,
        notificationId: notification.id,
        sent: true,
      };
    } catch (error) {
      this.logger.error(
        `Failed to send ${timeWindow} notification for order #${order.id}: ${error.message}`,
        error.stack,
      );
      
      return {
        orderId: order.id,
        clientId: clientId,
        timeWindow: timeWindow,
        sent: false,
        error: error.message,
      };
    }
  }
} 