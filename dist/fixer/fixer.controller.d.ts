import { FixerService } from './fixer.service';
export declare class FixerController {
    private readonly fixerService;
    constructor(fixerService: FixerService);
    fetchFixerData(id: number): Promise<{
        data: {};
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: {
            activeOrder: {
                id: number;
                closed: boolean;
                status: import("@prisma/client").$Enums.OperationStatus;
                orderOperatorId: number;
                createdAt: Date;
                updatedAt: Date;
                notes: string | null;
                finishedAt: Date | null;
            };
            idCard: {
                id: number;
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                code: string | null;
                frontImage: string | null;
                backImage: string | null;
            };
            balance: {
                id: number;
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                pendingBalance: number | null;
                activeBalance: number | null;
            };
            orders: {
                id: number;
                closed: boolean;
                status: import("@prisma/client").$Enums.OperationStatus;
                createdAt: Date;
                updatedAt: Date;
                leaderId: number | null;
                adminNotes: string | null;
                beginWork: boolean | null;
                clientApproveToBeginWork: boolean | null;
                startDate: Date | null;
            }[];
            stats: {
                id: number;
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                experience: number | null;
                averageRating: number | null;
                totalEarnings: number | null;
                completedJobs: number | null;
            };
            id: number;
            name: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            uuid: string;
            email: string | null;
            location: string | null;
            profileImage: string | null;
            idCardApproved: boolean;
            professionalLicense: boolean;
            isVerified: boolean;
            activeOrderId: number | null;
            verifiedAt: Date | null;
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
}
