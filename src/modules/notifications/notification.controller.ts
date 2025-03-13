import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';

// DTOs for requests
class CreateNotificationDto {
  title: string;
  body: string;
  data?: Record<string, any>;
  imageUrl?: string;
  isGlobal: boolean;
  recipientId?: number;
}

class NotificationQueryDto {
  page?: number;
  limit?: number;
}

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Create a new notification
  @Post()
  // @UseGuards(JwtAuthGuard)
  async createNotification(@Body() dto: CreateNotificationDto) {
    return this.notificationService.createNotification(dto);
  }

  // Send a global notification
  @Post('global')
  // @UseGuards(JwtAuthGuard)
  async sendGlobalNotification(@Body() dto: CreateNotificationDto) {
    // // Force isGlobal to true
    // dto.isGlobal = true;
    // dto.recipientId = undefined;
    
    return this.notificationService.createNotification(dto);
  }

  // Get user notifications
  @Get('user/:userId')
  // @UseGuards(JwtAuthGuard)
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query() query: NotificationQueryDto,
  ) {
    const page = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 20;
    
    return this.notificationService.getUserNotifications(parseInt(userId, 10), page, limit);
  }

  // Get unread count
  @Get('user/:userId/unread')
  // @UseGuards(JwtAuthGuard)
  async getUnreadCount(@Param('userId') userId: string) {
    return this.notificationService.getUnreadCount(parseInt(userId, 10));
  }

  // Mark notification as read
  @Post(':id/read/:userId')
  // @UseGuards(JwtAuthGuard)
  async markAsRead(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.notificationService.markAsRead(
      parseInt(id, 10),
      parseInt(userId, 10),
    );
  }

  // Store FCM token
  @Post('token')
  async storeToken(
    @Body() data: { userId: number; token: string },
  ) {
    // Implement token storage in the client session
    // This will be handled by the ClientSession model
    return { success: true };
  }
} 