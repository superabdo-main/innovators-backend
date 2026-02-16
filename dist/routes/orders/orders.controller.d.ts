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
                    purchaseId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    serviceId: number;
                    itemUUID: number | null;
                    itemName: string | null;
                    price: number | null;
                    quantity: number;
                }[];
                malfunctions: {
                    id: number;
                    description: string | null;
                    purchaseId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    serviceId: number;
                    itemUUID: number | null;
                    imagesUrls: string[];
                }[];
            } & {
                id: number;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                orderOperatorId: number | null;
                fullname: string | null;
                address: string | null;
                maintenanceDate: Date | null;
                subTotal: number | null;
                discount: number | null;
                total: number | null;
                clientId: number;
            };
            fixers: {
                id: number;
                name: string | null;
                userId: string | null;
                uuid: string;
                password: string;
                phone: string | null;
                email: string | null;
                location: string | null;
                profileImage: string | null;
                idCardApproved: boolean;
                professionalLicense: boolean;
                isVerified: boolean;
                verifiedAt: Date | null;
                activeOrderId: number | null;
                isBanned: boolean;
                pause: boolean;
                createdAt: Date;
                updatedAt: Date;
            }[];
            fixersNotes: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                orderId: number;
                fixerUserId: number;
                note: string | null;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
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
                    purchaseId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    serviceId: number;
                    itemUUID: number | null;
                    itemName: string | null;
                    price: number | null;
                    quantity: number;
                }[];
                malfunctions: {
                    id: number;
                    description: string | null;
                    purchaseId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    serviceId: number;
                    itemUUID: number | null;
                    imagesUrls: string[];
                }[];
            } & {
                id: number;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                orderOperatorId: number | null;
                fullname: string | null;
                address: string | null;
                maintenanceDate: Date | null;
                subTotal: number | null;
                discount: number | null;
                total: number | null;
                clientId: number;
            };
            fixers: {
                id: number;
                name: string | null;
                userId: string | null;
                uuid: string;
                password: string;
                phone: string | null;
                email: string | null;
                location: string | null;
                profileImage: string | null;
                idCardApproved: boolean;
                professionalLicense: boolean;
                isVerified: boolean;
                verifiedAt: Date | null;
                activeOrderId: number | null;
                isBanned: boolean;
                pause: boolean;
                createdAt: Date;
                updatedAt: Date;
            }[];
            fixersNotes: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                imageUrl: string | null;
                orderId: number;
                fixerUserId: number;
                note: string | null;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
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
        })[];
        ok: boolean;
        status: number;
        error: string;
    }>;
}
