import { CreateAuthDto, CreateFixerAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'nestjs-prisma';
import { AuthDto, FixerAuthDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createAuthDto: CreateAuthDto): Promise<{
        data: {};
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: {
            id: number;
            name: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            uuid: string;
            email: string;
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
    createFixerUser(createAuthDto: CreateFixerAuthDto): Promise<{
        data: {
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
    } | {
        data: {};
        status: number;
        ok: boolean;
        error: string;
    }>;
    login(authDto: AuthDto): Promise<{
        data: {};
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: {
            id: number;
            name: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            uuid: string;
            email: string;
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
    fixerLogin(authDto: FixerAuthDto): Promise<{
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
            ordersNotes: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                activeOrderId: number | null;
                orderId: number;
                fixerUserId: number;
                note: string | null;
                imageUrl: string | null;
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
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
    checkEmail(email: string): Promise<boolean>;
}
