import { PrismaService } from 'nestjs-prisma';
export type NotificationType = 'ORDER_ASSIGNMENT' | 'ORDER_STATUS_CHANGE' | 'ORDER_COMPLETION' | 'SYSTEM_ALERT';
interface NotificationData {
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, any>;
}
export declare class NotificationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createNotification(notificationData: NotificationData): Promise<{
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
    getUnreadNotifications(userId: number): Promise<{
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
    }[]>;
    markAsRead(notificationId: number): Promise<{
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
    markAllAsRead(userId: number): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteNotification(notificationId: number): Promise<{
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
    getNotificationHistory(userId: number, page?: number, limit?: number): Promise<{
        notifications: {
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
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
export {};
