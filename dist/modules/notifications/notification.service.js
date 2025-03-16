"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const admin = require("firebase-admin");
const client_1 = require("@prisma/client");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NotificationService_1.name);
        if (!admin.apps.length) {
            this.logger.warn('Firebase admin SDK not initialized in the notification service');
        }
    }
    async createNotification(data) {
        try {
            const dataString = data.data ? JSON.stringify(data.data) : null;
            const notification = await this.prisma.notification.create({
                data: {
                    title: data.title,
                    body: data.body,
                    data: dataString,
                    imageUrl: data.imageUrl,
                    isGlobal: data.isGlobal,
                    recipientId: data.recipientId,
                    sendStatus: client_1.SendStatus.PENDING,
                },
            });
            if (data.isGlobal) {
                await this.sendGlobalNotification(notification.id);
            }
            else if (data.recipientId) {
                await this.sendUserNotification(notification.id);
            }
            return notification;
        }
        catch (error) {
            this.logger.error(`Error creating notification: ${error.message}`, error.stack);
            throw error;
        }
    }
    async sendUserNotification(notificationId) {
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
            const userSessions = await this.prisma.clientSession.findFirst({
                where: {
                    userId: notification.recipientId,
                    fcmToken: { not: null },
                },
                select: { fcmToken: true },
            });
            if (!userSessions) {
                await this.prisma.notification.update({
                    where: { id: notificationId },
                    data: {
                        sendStatus: client_1.SendStatus.FAILED,
                        sendAttempts: { increment: 1 },
                        lastAttemptAt: new Date(),
                    },
                });
                throw new Error(`No FCM tokens found for user ${notification.recipientId}`);
            }
            if (userSessions.fcmToken) {
                await this.sendFCMNotification(userSessions.fcmToken, notification);
            }
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    sendStatus: client_1.SendStatus.SENT,
                    sendAttempts: { increment: 1 },
                    lastAttemptAt: new Date(),
                    sentAt: new Date(),
                },
            });
            return true;
        }
        catch (error) {
            this.logger.error(`Error sending user notification: ${error.message}`, error.stack);
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    sendStatus: client_1.SendStatus.FAILED,
                    sendAttempts: { increment: 1 },
                    lastAttemptAt: new Date(),
                },
            });
            throw error;
        }
    }
    async sendGlobalNotification(notificationId) {
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
            const sessions = await this.prisma.clientSession.findMany({
                where: { fcmToken: { not: null } },
                select: { fcmToken: true },
                distinct: ['fcmToken'],
            });
            if (!sessions.length) {
                await this.prisma.notification.update({
                    where: { id: notificationId },
                    data: {
                        sendStatus: client_1.SendStatus.FAILED,
                        sendAttempts: { increment: 1 },
                        lastAttemptAt: new Date(),
                    },
                });
                throw new Error('No FCM tokens found for global notification');
            }
            for (const session of sessions) {
                if (session.fcmToken) {
                    await this.sendFCMNotification(session.fcmToken, notification);
                }
            }
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    sendStatus: client_1.SendStatus.SENT,
                    sendAttempts: { increment: 1 },
                    lastAttemptAt: new Date(),
                    sentAt: new Date(),
                },
            });
            return true;
        }
        catch (error) {
            this.logger.error(`Error sending global notification: ${error.message}`, error.stack);
            await this.prisma.notification.update({
                where: { id: notificationId },
                data: {
                    sendStatus: client_1.SendStatus.FAILED,
                    sendAttempts: { increment: 1 },
                    lastAttemptAt: new Date(),
                },
            });
            throw error;
        }
    }
    async markAsRead(notificationId, userId) {
        try {
            const notification = await this.prisma.notification.findFirst({
                where: {
                    id: notificationId,
                    OR: [{ recipientId: userId }, { isGlobal: true }],
                },
            });
            if (!notification) {
                throw new Error(`Notification with ID ${notificationId} not found or not accessible by user ${userId}`);
            }
            return this.prisma.notification.update({
                where: { id: notificationId },
                data: { isRead: true },
            });
        }
        catch (error) {
            this.logger.error(`Error marking notification as read: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getUserNotifications(userId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [notifications, total] = await Promise.all([
                this.prisma.notification.findMany({
                    where: {
                        OR: [{ recipientId: userId }, { isGlobal: true }],
                    },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: limit,
                }),
                this.prisma.notification.count({
                    where: {
                        OR: [{ recipientId: userId }, { isGlobal: true }],
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
        }
        catch (error) {
            this.logger.error(`Error getting user notifications: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getUnreadCount(userId) {
        try {
            const count = await this.prisma.notification.count({
                where: {
                    OR: [{ recipientId: userId }],
                    isRead: false,
                },
            });
            return { count };
        }
        catch (error) {
            this.logger.error(`Error getting unread count: ${error.message}`, error.stack);
            throw error;
        }
    }
    async sendFCMNotification(token, notification) {
        try {
            const message = {
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
        }
        catch (error) {
            this.logger.error(`Error sending FCM notification: ${error.message}`, error.stack);
            throw error;
        }
    }
    async sendFCMNotificationToTopic(topic, notification) {
        try {
            const message = {
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
        }
        catch (error) {
            this.logger.error(`Error sending FCM notification to topic: ${error.message}`, error.stack);
            throw error;
        }
    }
    async deleteNotification(notificationId, userId) {
        try {
            const notification = await this.prisma.notification.findFirst({
                where: {
                    id: notificationId,
                    OR: [{ recipientId: userId }, { isGlobal: true }],
                },
            });
            if (!notification) {
                throw new Error(`Notification with ID ${notificationId} not found or not accessible by user ${userId}`);
            }
            return this.prisma.notification.delete({
                where: { id: notificationId },
            });
        }
        catch (error) {
            this.logger.error(`Error deleting notification: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map