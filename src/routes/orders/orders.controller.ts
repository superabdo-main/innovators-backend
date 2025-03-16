import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersNotificationService } from './orders-notification.service';
import { NotificationResponseDto, NotificationTimeThreshold, OrderNotificationDto } from './dto/order-notification.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly notificationService: OrdersNotificationService
  ) {}

  /**
   * Check for upcoming orders and send notifications based on time thresholds
   */
  @Post('notifications/check')
  async checkAndSendNotifications(): Promise<NotificationResponseDto> {
    return this.notificationService.checkAndSendUpcomingOrderNotifications();
  }

  /**
   * Send a specific notification for an order
   * @param orderId The order ID
   * @param timeThreshold The time threshold ('1-hour' or '10-minutes')
   */
  @Post('notifications/:orderId')
  async sendOrderNotification(
    @Param('orderId') orderId: string,
    @Query() notificationDto: OrderNotificationDto,
  ): Promise<NotificationResponseDto> {
    if (!notificationDto.timeThreshold) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Time threshold is required (1-hour or 10-minutes)',
          additionalInfo: {
            code: 'NOTIFICATION_TIME_THRESHOLD_REQUIRED',
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    
    return this.notificationService.sendSpecificNotification(
      notificationDto.timeThreshold,
      +orderId,
    );
  }

  /**
   * Get active orders for a client
   * @param clientId The client ID
   */
  @Get('client/:clientId/active')
  async getClientActiveOrders(@Param('clientId') clientId: string) {
    return this.ordersService.getClientActiveOrders(+clientId);
  }

  /**
   * Get completed orders for a client
   * @param clientId The client ID
   */
  @Get('client/:clientId/completed')
  async getClientCompletedOrders(@Param('clientId') clientId: string) {
    return this.ordersService.getClientFinishedOrders(+clientId);
  }
}
