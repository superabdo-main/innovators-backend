import { PrismaService } from 'nestjs-prisma';
import { FixerAssignmentService } from '../fixer/fixer-assignment.service';
export declare class OrdersService {
    private prisma;
    private assignmentService;
    constructor(prisma: PrismaService, assignmentService: FixerAssignmentService);
    create(purchaseId: number, servicesIds: number[], workStartDate: Date, estimatedDuration: number): Promise<{
        data: any;
        ok: boolean;
        status: number;
        error: string;
    }>;
    getClientActiveOrders(clientId: number): Promise<{
        data: ({
            purchase: {
                items: {
                    id: number;
                    purchaseId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    serviceId: number;
                    itemUUID: number | null;
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
    getClientFinishedOrders(clientId: number): Promise<{
        data: ({
            purchase: {
                items: {
                    id: number;
                    purchaseId: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    serviceId: number;
                    itemUUID: number | null;
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
