import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export type NotificationType =
  | 'ORDER_ASSIGNMENT'
  | 'ORDER_STATUS_CHANGE'
  | 'ORDER_COMPLETION'
  | 'SYSTEM_ALERT';

interface NotificationData {
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  async createNotification(notificationData: NotificationData) {
    try {
      const notification = await this.prisma.notification.create({
        data: {
          userId: notificationData.userId,
          type: notificationData.type,
          title: notificationData.title,
          message: notificationData.message,
          data: notificationData.data || {},
        },
      });

      // Here you can implement real-time notification using WebSocket
      // this.websocketGateway.sendNotification(notification);

      return notification;
    } catch (error) {
      this.logger.error('Error creating notification:', error);
      throw error;
    }
  }

  async getUnreadNotifications(userId: number) {
    try {
      return await this.prisma.notification.findMany({
        where: {
          userId,
          read: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      this.logger.error('Error fetching unread notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: number) {
    try {
      return await this.prisma.notification.update({
        where: { id: notificationId },
        data: { read: true },
      });
    } catch (error) {
      this.logger.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead(userId: number) {
    try {
      return await this.prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true },
      });
    } catch (error) {
      this.logger.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async deleteNotification(notificationId: number) {
    try {
      return await this.prisma.notification.delete({
        where: { id: notificationId },
      });
    } catch (error) {
      this.logger.error('Error deleting notification:', error);
      throw error;
    }
  }

  async getNotificationHistory(userId: number, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;

      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prisma.notification.count({
          where: { userId },
        }),
      ]);

      return {
        notifications,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error('Error fetching notification history:', error);
      throw error;
    }
  }
}
