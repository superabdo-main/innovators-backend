import { OrdersService } from './orders.service';
import { OrdersNotificationService } from './orders-notification.service';
import { NotificationResponseDto, OrderNotificationDto } from './dto/order-notification.dto';
export declare class OrdersController {
    private readonly ordersService;
    private readonly notificationService;
    constructor(ordersService: OrdersService, notificationService: OrdersNotificationService);
    checkAndSendNotifications(): Promise<NotificationResponseDto>;
    sendOrderNotification(orderId: string, notificationDto: OrderNotificationDto): Promise<NotificationResponseDto>;
    getClientActiveOrders(clientId: string): Promise<{
        data: ({
            purchase: {
                items: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    purchaseId: number | null;
                    itemUUID: number | null;
                    itemName: string | null;
                    serviceId: number;
                    price: number | null;
                    quantity: number;
                }[];
                malfunctions: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    purchaseId: number | null;
                    itemUUID: number | null;
                    serviceId: number;
                    description: string | null;
                    imagesUrls: string[];
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                clientId: number;
                fullname: string | null;
                address: string | null;
                phone: string | null;
                maintenanceDate: Date | null;
                subTotal: number | null;
                discount: number | null;
                total: number | null;
                orderOperatorId: number | null;
            };
            fixers: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                uuid: string;
                name: string | null;
                email: string | null;
                password: string;
                userId: string | null;
                location: string | null;
                profileImage: string | null;
                idCardApproved: boolean;
                professionalLicense: boolean;
                isVerified: boolean;
                verifiedAt: Date | null;
                activeOrderId: number | null;
                isBanned: boolean;
                pause: boolean;
            }[];
            fixersNotes: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                orderId: number;
                fixerUserId: number;
                note: string | null;
                imageUrl: string | null;
            }[];
        } & {
            id: number;
            leaderId: number | null;
            adminNotes: string | null;
            beginWork: boolean | null;
            beginWorkTime: Date | null;
            clientApproveToBeginWork: boolean | null;
            clientApproveToBeginWorkTime: Date | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            clientRate: number | null;
            clientNotes: string | null;
            maintenanceDuration: number | null;
            maintenanceStartDate: Date | null;
            startTime: Date | null;
            endTime: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        ok: boolean;
        status: number;
        error: string;
    }>;
    getClientCompletedOrders(clientId: string): Promise<{
        data: ({
            purchase: {
                items: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    purchaseId: number | null;
                    itemUUID: number | null;
                    itemName: string | null;
                    serviceId: number;
                    price: number | null;
                    quantity: number;
                }[];
                malfunctions: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    purchaseId: number | null;
                    itemUUID: number | null;
                    serviceId: number;
                    description: string | null;
                    imagesUrls: string[];
                }[];
            } & {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                clientId: number;
                fullname: string | null;
                address: string | null;
                phone: string | null;
                maintenanceDate: Date | null;
                subTotal: number | null;
                discount: number | null;
                total: number | null;
                orderOperatorId: number | null;
            };
            fixers: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                uuid: string;
                name: string | null;
                email: string | null;
                password: string;
                userId: string | null;
                location: string | null;
                profileImage: string | null;
                idCardApproved: boolean;
                professionalLicense: boolean;
                isVerified: boolean;
                verifiedAt: Date | null;
                activeOrderId: number | null;
                isBanned: boolean;
                pause: boolean;
            }[];
            fixersNotes: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                orderId: number;
                fixerUserId: number;
                note: string | null;
                imageUrl: string | null;
            }[];
        } & {
            id: number;
            leaderId: number | null;
            adminNotes: string | null;
            beginWork: boolean | null;
            beginWorkTime: Date | null;
            clientApproveToBeginWork: boolean | null;
            clientApproveToBeginWorkTime: Date | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            clientRate: number | null;
            clientNotes: string | null;
            maintenanceDuration: number | null;
            maintenanceStartDate: Date | null;
            startTime: Date | null;
            endTime: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        ok: boolean;
        status: number;
        error: string;
    }>;
}
