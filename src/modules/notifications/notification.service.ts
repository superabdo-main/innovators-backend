import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as admin from 'firebase-admin';
import { SendStatus } from '@prisma/client';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  
  constructor(private prisma: PrismaService) {
    // Ensure Firebase admin is initialized (should be done in the main module)
    if (!admin.apps.length) {
      this.logger.warn('Firebase admin SDK not initialized in the notification service');
    }
  }

  // Create a notification in the database
  async createNotification(data: {
    title: string;
    body: string;
    data?: Record<string, any>;
    imageUrl?: string;
    isGlobal: boolean;
    recipientId?: number;
  }) {
    try {
      // Convert data object to JSON string if present
      const dataString = data.data ? JSON.stringify(data.data) : null;

      const notification = await this.prisma.notification.create({
        data: {
          title: data.title,
          body: data.body,
          data: dataString,
          imageUrl: data.imageUrl,
          isGlobal: data.isGlobal,
          recipientId: data.recipientId,
          sendStatus: SendStatus.PENDING,
        },
      });

      // If it's a global notification, send to all users
      if (data.isGlobal) {
        await this.sendGlobalNotification(notification.id);
      } 
      // If it's for a specific user, send to that user
      else if (data.recipientId) {
        await this.sendUserNotification(notification.id);
      }

      return notification;
    } catch (error) {
      this.logger.error(`Error creating notification: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Send notification to a specific user
  async sendUserNotification(notificationId: number) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
        include: { recipient: true },
      });

      if (!notification) {
        throw new Error(`Notification with ID ${notificationId} not found`);
      }

      if (!notification.recipient) {
        throw new Error(`Recipient not found for notification ${notificationId}`);
      }

      // Get FCM token from the user's sessions
      const userSessions = await this.prisma.clientSession.findMany({
        where: { 
          userId: notification.recipientId,
          fcmToken: { not: null },
        },
        select: { fcmToken: true },
      });

      if (!userSessions.length) {
        await this.prisma.notification.update({
          where: { id: notificationId },
          data: { 
            sendStatus: SendStatus.FAILED,
            sendAttempts: { increment: 1 },
            lastAttemptAt: new Date(),
          },
        });
        throw new Error(`No FCM tokens found for user ${notification.recipientId}`);
      }
      // Send notification to all user devices
      for (const session of userSessions) {
        if (session.fcmToken) {
          await this.sendFCMNotification(session.fcmToken, notification);
        }
      }

      // Update notification status
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          sendStatus: SendStatus.SENT,
          sendAttempts: { increment: 1 },
          lastAttemptAt: new Date(),
          sentAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      this.logger.error(`Error sending user notification: ${error.message}`, error.stack);
      
      // Update attempt count
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          sendStatus: SendStatus.FAILED,
          sendAttempts: { increment: 1 },
          lastAttemptAt: new Date(),
        },
      });
      
      throw error;
    }
  }

  // Send notification to all users (global)
  async sendGlobalNotification(notificationId: number) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id: notificationId },
      });

      if (!notification) {
        throw new Error(`Notification with ID ${notificationId} not found`);
      }

      if (!notification.isGlobal) {
        throw new Error(`Notification with ID ${notificationId} is not global`);
      }

      // Get all active FCM tokens
      const sessions = await this.prisma.clientSession.findMany({
        where: { fcmToken: { not: null } },
        select: { fcmToken: true },
        distinct: ['fcmToken'],
      });

      if (!sessions.length) {
        await this.prisma.notification.update({
          where: { id: notificationId },
          data: { 
            sendStatus: SendStatus.FAILED,
            sendAttempts: { increment: 1 },
            lastAttemptAt: new Date(),
          },
        });
        throw new Error('No FCM tokens found for global notification');
      }

      // Send to topic or to each token individually
      // Option 1: Send to topic if you've set up topics
      // await this.sendFCMNotificationToTopic('all_users', notification);
      
      // Option 2: Send to individual tokens
      for (const session of sessions) {
        if (session.fcmToken) {
          await this.sendFCMNotification(session.fcmToken, notification);
        }
      }

      // Update notification status
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          sendStatus: SendStatus.SENT,
          sendAttempts: { increment: 1 },
          lastAttemptAt: new Date(),
          sentAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      this.logger.error(`Error sending global notification: ${error.message}`, error.stack);
      
      // Update attempt count
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          sendStatus: SendStatus.FAILED,
          sendAttempts: { increment: 1 },
          lastAttemptAt: new Date(),
        },
      });
      
      throw error;
    }
  }

  // Mark a notification as read
  async markAsRead(notificationId: number, userId: number) {
    try {
      const notification = await this.prisma.notification.findFirst({
        where: {
          id: notificationId,
          OR: [
            { recipientId: userId },
            { isGlobal: true }
          ]
        },
      });

      if (!notification) {
        throw new Error(`Notification with ID ${notificationId} not found or not accessible by user ${userId}`);
      }

      return this.prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true },
      });
    } catch (error) {
      this.logger.error(`Error marking notification as read: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Get user notifications
  async getUserNotifications(userId: number, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      
      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where: {
            OR: [
              { recipientId: userId },
              { isGlobal: true }
            ]
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        this.prisma.notification.count({
          where: {
            OR: [
              { recipientId: userId },
              { isGlobal: true }
            ]
          },
        }),
      ]);

      return {
        data: notifications,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error(`Error getting user notifications: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Get unread count
  async getUnreadCount(userId: number) {
    try {
      const count = await this.prisma.notification.count({
        where: {
          OR: [
            { recipientId: userId },
            { isGlobal: true }
          ],
          isRead: false,
        },
      });

      return { count };
    } catch (error) {
      this.logger.error(`Error getting unread count: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Helper method to send FCM notification
  private async sendFCMNotification(
    token: string, 
    notification: { title: string; body: string; data?: string; imageUrl?: string }
  ) {
    try {
      const message: admin.messaging.Message = {
        token,
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.imageUrl || undefined,
        },
        data: notification.data ? JSON.parse(notification.data) : undefined,
      };

      const response = await admin.messaging().send(message);
      this.logger.log(`Successfully sent FCM message: ${response}`);
      return response;
    } catch (error) {
      this.logger.error(`Error sending FCM notification: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Helper method to send FCM notification to a topic
  private async sendFCMNotificationToTopic(
    topic: string,
    notification: { title: string; body: string; data?: string; imageUrl?: string }
  ) {
    try {
      const message: admin.messaging.Message = {
        topic,
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.imageUrl,
        },
        data: notification.data ? JSON.parse(notification.data) : undefined,
      };

      const response = await admin.messaging().send(message);
      this.logger.log(`Successfully sent FCM message to topic: ${response}`);
      return response;
    } catch (error) {
      this.logger.error(`Error sending FCM notification to topic: ${error.message}`, error.stack);
      throw error;
    }
  }
} 