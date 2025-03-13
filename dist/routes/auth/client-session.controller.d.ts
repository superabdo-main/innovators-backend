import { ClientSessionService } from './client-session.service';
import { ClientLoginDto, ClientSignupDto } from './dto/client-auth.dto';
export declare class ClientSessionController {
    private readonly clientSessionService;
    constructor(clientSessionService: ClientSessionService);
    signup(signupDto: ClientSignupDto): Promise<{
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
    login(loginDto: ClientLoginDto): Promise<{
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
    checkSession(auth: string): Promise<{
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
    logout(auth: string): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
    updateFcmToken(data: {
        userId: number;
        deviceId: string;
        fcmToken: string;
    }): Promise<{
        data: {
            success: boolean;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
}
