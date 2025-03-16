import { PrismaService } from 'nestjs-prisma';
export declare class NotificationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createNotification(data: {
        title: string;
        body: string;
        data?: Record<string, any>;
        imageUrl?: string;
        isGlobal: boolean;
        recipientId?: number;
    }): Promise<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        data: string | null;
        title: string;
        body: string;
        imageUrl: string | null;
        isRead: boolean;
        isGlobal: boolean;
        recipientId: number | null;
        fcmToken: string | null;
        sendStatus: import("@prisma/client").$Enums.SendStatus;
        sendAttempts: number;
        lastAttemptAt: Date | null;
        sentAt: Date | null;
    }>;
    sendUserNotification(notificationId: number): Promise<boolean>;
    sendGlobalNotification(notificationId: number): Promise<boolean>;
    markAsRead(notificationId: number, userId: number): Promise<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        data: string | null;
        title: string;
        body: string;
        imageUrl: string | null;
        isRead: boolean;
        isGlobal: boolean;
        recipientId: number | null;
        fcmToken: string | null;
        sendStatus: import("@prisma/client").$Enums.SendStatus;
        sendAttempts: number;
        lastAttemptAt: Date | null;
        sentAt: Date | null;
    }>;
    getUserNotifications(userId: number, page?: number, limit?: number): Promise<{
        data: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            data: string | null;
            title: string;
            body: string;
            imageUrl: string | null;
            isRead: boolean;
            isGlobal: boolean;
            recipientId: number | null;
            fcmToken: string | null;
            sendStatus: import("@prisma/client").$Enums.SendStatus;
            sendAttempts: number;
            lastAttemptAt: Date | null;
            sentAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUnreadCount(userId: number): Promise<{
        count: number;
    }>;
    private sendFCMNotification;
    private sendFCMNotificationToTopic;
    deleteNotification(notificationId: number, userId: number): Promise<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        data: string | null;
        title: string;
        body: string;
        imageUrl: string | null;
        isRead: boolean;
        isGlobal: boolean;
        recipientId: number | null;
        fcmToken: string | null;
        sendStatus: import("@prisma/client").$Enums.SendStatus;
        sendAttempts: number;
        lastAttemptAt: Date | null;
        sentAt: Date | null;
    }>;
}
