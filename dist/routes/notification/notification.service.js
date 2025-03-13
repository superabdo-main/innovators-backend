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
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    async createNotification(notificationData) {
        try {
            const notification = await this.prisma.notification.create({
                data: {
                    recipientId: notificationData.userId,
                    title: notificationData.title,
                    body: notificationData.message,
                    data: JSON.stringify(notificationData.data),
                },
            });
            return notification;
        }
        catch (error) {
            this.logger.error('Error creating notification:', error);
            throw error;
        }
    }
    async getUnreadNotifications(userId) {
        try {
            return await this.prisma.notification.findMany({
                where: {
                    recipientId: userId,
                    isRead: false,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
        catch (error) {
            this.logger.error('Error fetching unread notifications:', error);
            throw error;
        }
    }
    async markAsRead(notificationId) {
        try {
            return await this.prisma.notification.update({
                where: { id: notificationId },
                data: { isRead: true },
            });
        }
        catch (error) {
            this.logger.error('Error marking notification as read:', error);
            throw error;
        }
    }
    async markAllAsRead(userId) {
        try {
            return await this.prisma.notification.updateMany({
                where: { recipientId: userId, isRead: false },
                data: { isRead: true },
            });
        }
        catch (error) {
            this.logger.error('Error marking all notifications as read:', error);
            throw error;
        }
    }
    async deleteNotification(notificationId) {
        try {
            return await this.prisma.notification.delete({
                where: { id: notificationId },
            });
        }
        catch (error) {
            this.logger.error('Error deleting notification:', error);
            throw error;
        }
    }
    async getNotificationHistory(userId, page = 1, limit = 20) {
        try {
            const skip = (page - 1) * limit;
            const [notifications, total] = await Promise.all([
                this.prisma.notification.findMany({
                    where: { recipientId: userId },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: limit,
                }),
                this.prisma.notification.count({
                    where: { recipientId: userId },
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
        }
        catch (error) {
            this.logger.error('Error fetching notification history:', error);
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