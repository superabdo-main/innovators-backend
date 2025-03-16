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
    getClientFinishedOrders(clientId: number): Promise<{
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
