import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from 'nestjs-prisma';
import { OrdersService } from 'src/orders/orders.service';
export declare class PurchaseService {
    private readonly prisma;
    private orderService;
    constructor(prisma: PrismaService, orderService: OrdersService);
    getClosestOrder(id: string): Promise<{
        data: {
            id: number;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            phone: string | null;
            orderOperatorId: number | null;
            fullname: string | null;
            address: string | null;
            date: Date | null;
            total: number | null;
            AuthUserId: number | null;
        }[];
        ok: boolean;
        error: string;
    }>;
    create(createPurchaseDto: CreatePurchaseDto): Promise<{
        data: {
            data: {
                fixers: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string | null;
                    uuid: string;
                    password: string;
                    name: string | null;
                    phone: string | null;
                    email: string | null;
                    location: string | null;
                    profileImage: string | null;
                    idCardApproved: boolean;
                    professionalLicense: boolean;
                    isVerified: boolean;
                    verifiedAt: Date | null;
                    activeOrderId: number | null;
                }[];
            } & {
                id: number;
                leaderId: string | null;
                adminNotes: string | null;
                beginWork: boolean | null;
                clientApproveToBeginWork: boolean | null;
                status: import("@prisma/client").$Enums.OperationStatus;
                closed: boolean;
                startDate: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
            fixers: {
                data: {
                    fixerIds: any[];
                    leaderId: any;
                    nextAvailableTime: Date;
                    message: string;
                };
                status: number;
                ok: boolean;
                error: string;
            } | {
                data: {
                    fixerIds: string[];
                    leaderId: string;
                    message: string;
                    nextAvailableTime?: undefined;
                };
                status: number;
                ok: boolean;
                error: string;
            };
            ok: boolean;
            status: number;
            error: string;
        } | {
            data: {};
            ok: boolean;
            status: number;
            error: string;
            fixers?: undefined;
        };
        ok: boolean;
        error: string;
    } | {
        data: any[];
        ok: boolean;
        error: string;
    }>;
    getAllOrders(): Promise<{
        data: ({
            items: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                name: string | null;
                price: number | null;
                amount: number | null;
                purchaseId: number | null;
            }[];
            issue: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                purchaseId: number | null;
                mainTypeLabel: string | null;
                subTypeLabel: string | null;
                description: string | null;
                imageUrls: string[];
            }[];
        } & {
            id: number;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            phone: string | null;
            orderOperatorId: number | null;
            fullname: string | null;
            address: string | null;
            date: Date | null;
            total: number | null;
            AuthUserId: number | null;
        })[];
        ok: boolean;
        error: string;
    }>;
    finishOrder(id: string): Promise<{
        data: {};
        ok: boolean;
        error: string;
    } | {
        data: any[];
        ok: boolean;
        error: string;
    }>;
    getActiveOrders(id: string): Promise<{
        data: ({
            items: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                name: string | null;
                price: number | null;
                amount: number | null;
                purchaseId: number | null;
            }[];
            issue: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                purchaseId: number | null;
                mainTypeLabel: string | null;
                subTypeLabel: string | null;
                description: string | null;
                imageUrls: string[];
            }[];
        } & {
            id: number;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            phone: string | null;
            orderOperatorId: number | null;
            fullname: string | null;
            address: string | null;
            date: Date | null;
            total: number | null;
            AuthUserId: number | null;
        })[];
        ok: boolean;
        error: string;
    }>;
    getOldOrders(id: string): Promise<{
        data: ({
            items: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                name: string | null;
                price: number | null;
                amount: number | null;
                purchaseId: number | null;
            }[];
            issue: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                purchaseId: number | null;
                mainTypeLabel: string | null;
                subTypeLabel: string | null;
                description: string | null;
                imageUrls: string[];
            }[];
        } & {
            id: number;
            status: import("@prisma/client").$Enums.OperationStatus;
            closed: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            phone: string | null;
            orderOperatorId: number | null;
            fullname: string | null;
            address: string | null;
            date: Date | null;
            total: number | null;
            AuthUserId: number | null;
        })[];
        ok: boolean;
        error: string;
    }>;
    cancel(id: string): Promise<{
        data: {};
        ok: boolean;
        error: string;
    } | {
        data: any[];
        ok: boolean;
        error: string;
    }>;
    remove(id: number): string;
}
