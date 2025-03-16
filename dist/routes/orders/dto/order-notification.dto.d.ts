export declare enum NotificationTimeThreshold {
    ONE_HOUR = "1-hour",
    TEN_MINUTES = "10-minutes"
}
export declare class OrderNotificationDto {
    timeThreshold: NotificationTimeThreshold;
}
export declare class OrderNotificationResponseDto {
    orderId: number;
    clientId: number;
    timeWindow: string;
    notificationId?: number;
    sent: boolean;
    error?: string;
}
export declare class NotificationResponseDto {
    data: OrderNotificationResponseDto[] | OrderNotificationResponseDto | null;
    ok: boolean;
    status: number;
    error: string;
}
