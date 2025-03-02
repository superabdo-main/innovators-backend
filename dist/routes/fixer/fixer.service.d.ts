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
            userId: string | null;
            uuid: string;
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
            isBanned: boolean;
            pause: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
}
