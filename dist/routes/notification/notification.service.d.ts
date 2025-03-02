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
        data: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        type: string;
        title: string;
        message: string;
        read: boolean;
    }>;
    getUnreadNotifications(userId: number): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        type: string;
        title: string;
        message: string;
        read: boolean;
    }[]>;
    markAsRead(notificationId: number): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        type: string;
        title: string;
        message: string;
        read: boolean;
    }>;
    markAllAsRead(userId: number): Promise<import("@prisma/client").Prisma.BatchPayload>;
    deleteNotification(notificationId: number): Promise<{
        data: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        type: string;
        title: string;
        message: string;
        read: boolean;
    }>;
    getNotificationHistory(userId: number, page?: number, limit?: number): Promise<{
        notifications: {
            data: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            type: string;
            title: string;
            message: string;
            read: boolean;
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
