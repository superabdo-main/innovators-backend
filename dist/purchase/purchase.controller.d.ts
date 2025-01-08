import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    create(createPurchaseDto: CreatePurchaseDto): Promise<{
        data: {
            id: number;
            userId: string | null;
            fullname: string | null;
            address: string | null;
            phone: string | null;
            date: Date | null;
            total: number | null;
            closed: boolean;
            AuthUserId: number | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            orderOperatorId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
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
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                purchaseId: number | null;
                price: number | null;
                amount: number | null;
            }[];
            issue: {
                id: number;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                mainTypeLabel: string | null;
                subTypeLabel: string | null;
                imageUrls: string[];
                purchaseId: number | null;
            }[];
        } & {
            id: number;
            userId: string | null;
            fullname: string | null;
            address: string | null;
            phone: string | null;
            date: Date | null;
            total: number | null;
            closed: boolean;
            AuthUserId: number | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            orderOperatorId: number | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        ok: boolean;
        error: string;
    }>;
    getOldOrders(id: string): Promise<{
        data: ({
            items: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                purchaseId: number | null;
                price: number | null;
                amount: number | null;
            }[];
            issue: {
                id: number;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                mainTypeLabel: string | null;
                subTypeLabel: string | null;
                imageUrls: string[];
                purchaseId: number | null;
            }[];
        } & {
            id: number;
            userId: string | null;
            fullname: string | null;
            address: string | null;
            phone: string | null;
            date: Date | null;
            total: number | null;
            closed: boolean;
            AuthUserId: number | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            orderOperatorId: number | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        ok: boolean;
        error: string;
    }>;
    getAllOrders(): Promise<{
        data: ({
            items: {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                purchaseId: number | null;
                price: number | null;
                amount: number | null;
            }[];
            issue: {
                id: number;
                description: string | null;
                createdAt: Date;
                updatedAt: Date;
                uuid: string | null;
                mainTypeLabel: string | null;
                subTypeLabel: string | null;
                imageUrls: string[];
                purchaseId: number | null;
            }[];
        } & {
            id: number;
            userId: string | null;
            fullname: string | null;
            address: string | null;
            phone: string | null;
            date: Date | null;
            total: number | null;
            closed: boolean;
            AuthUserId: number | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            orderOperatorId: number | null;
            createdAt: Date;
            updatedAt: Date;
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
    getClosestOrder(id: string): Promise<{
        data: {
            id: number;
            userId: string | null;
            fullname: string | null;
            address: string | null;
            phone: string | null;
            date: Date | null;
            total: number | null;
            closed: boolean;
            AuthUserId: number | null;
            status: import("@prisma/client").$Enums.OperationStatus;
            orderOperatorId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        ok: boolean;
        error: string;
    }>;
    cancelOrder(id: string): Promise<{
        data: {};
        ok: boolean;
        error: string;
    } | {
        data: any[];
        ok: boolean;
        error: string;
    }>;
    remove(id: string): string;
}
