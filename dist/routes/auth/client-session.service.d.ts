import { JwtService } from '@nestjs/jwt';
import { ClientLoginDto, ClientSignupDto } from './dto/client-auth.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class ClientSessionService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: ClientSignupDto): Promise<{
        data: {
            user: {
                id: number;
                name: string | null;
                uuid: string;
                password: string | null;
                phone: string | null;
                email: string;
                createdAt: Date;
                updatedAt: Date;
            };
            token: string;
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            user?: undefined;
            token?: undefined;
        };
        ok: boolean;
        status: number;
        error: any;
    }>;
    login(dto: ClientLoginDto): Promise<{
        data: {
            user?: undefined;
            token?: undefined;
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            user: {
                id: number;
                name: string | null;
                uuid: string;
                password: string | null;
                phone: string | null;
                email: string;
                createdAt: Date;
                updatedAt: Date;
            };
            token: string;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
    logout(token: string): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
    private generateToken;
    private createSession;
    updateFcmToken(userId: number, deviceId: string, fcmToken: string): Promise<{
        data: {
            success: boolean;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
    private deactivateExistingSessions;
    checkSession(token: string): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            fcmToken: string | null;
            token: string;
            deviceId: string;
            deviceModel: string;
            deviceOs: string;
            isActive: boolean;
            lastActivity: Date;
            expiresAt: Date;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
}
