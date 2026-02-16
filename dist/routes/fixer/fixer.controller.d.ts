import { FixerService } from './fixer.service';
import { FixerAssignmentService } from './fixer-assignment.service';
import { FixerAvailabilityResponseDto } from './dto/fixer-assignment.dto';
export declare class FixerController {
    private readonly fixerService;
    private readonly fixerAssignmentService;
    constructor(fixerService: FixerService, fixerAssignmentService: FixerAssignmentService);
    fetchFixerData(id: string): Promise<{
        data: {};
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: {
            idCard: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                fixerId: number;
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
            stats: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                fixerId: number;
                monthsOfExperience: number | null;
                averageRating: number | null;
                totalEarnings: number | null;
                completedJobs: number | null;
            };
            id: number;
            name: string | null;
            userId: string | null;
            uuid: string;
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
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
    findFixers(serviceIds: string, workDateTime: string, estimatedDuration: number): Promise<FixerAvailabilityResponseDto>;
    assignFixerToOrder(assignmentData: {
        orderId: number;
        fixerId: number;
        startTime: string;
        estimatedDuration: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
