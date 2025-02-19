import { PrismaService } from 'nestjs-prisma';
export declare class FixerService {
    private prisma;
    constructor(prisma: PrismaService);
    fetchFixerData(id: string): Promise<{
        data: {};
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: {
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
            userId: string | null;
            uuid: string;
            phone: string | null;
            email: string | null;
            location: string | null;
            profileImage: string | null;
            idCardApproved: boolean;
            professionalLicense: boolean;
            isVerified: boolean;
            activeOrderId: number | null;
            verifiedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
    findAvailableFixers(number: number, startDate: Date): Promise<{
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
    }>;
}
