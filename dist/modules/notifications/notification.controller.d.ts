import { NotificationService } from './notification.service';
declare class CreateNotificationDto {
    title: string;
    body: string;
    data?: Record<string, any>;
    imageUrl?: string;
    isGlobal: boolean;
    recipientId?: number;
}
declare class NotificationQueryDto {
    page?: number;
    limit?: number;
}
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(dto: CreateNotificationDto): Promise<{
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
    sendGlobalNotification(dto: CreateNotificationDto): Promise<{
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
    getUserNotifications(userId: string, query: NotificationQueryDto): Promise<{
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
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    markAsRead(id: string, userId: string): Promise<{
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
    deleteNotification(id: string, userId: string): Promise<{
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
    storeToken(data: {
        userId: number;
        token: string;
    }): Promise<{
        success: boolean;
    }>;
}
export {};
