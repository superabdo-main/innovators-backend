import { AuthService } from './auth.service';
import { CreateAuthDto, CreateFixerAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto, FixerAuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        data: {};
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: {
            id: number;
            name: string | null;
            uuid: string;
            phone: string | null;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
        status: number;
        ok: boolean;
        error: string;
    }>;
    createFixerUser(createAuthDto: CreateFixerAuthDto): Promise<{
        data: {
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
            uuid: string;
            phone: string | null;
            email: string;
            createdAt: Date;
            updatedAt: Date;
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
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
