import { PrismaService } from 'nestjs-prisma';
import { NotificationService } from '../../modules/notifications/notification.service';
import { NotificationResponseDto, NotificationTimeThreshold } from './dto/order-notification.dto';
export declare class OrdersNotificationService {
    private prisma;
    private notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    checkAndSendUpcomingOrderNotifications(): Promise<NotificationResponseDto>;
    sendSpecificNotification(timeThreshold: NotificationTimeThreshold, orderId: number): Promise<NotificationResponseDto>;
    private sendOrderNotification;
}
