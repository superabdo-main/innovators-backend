import { ClientSessionService } from './client-session.service';
import { ClientLoginDto, ClientSignupDto } from './dto/client-auth.dto';
export declare class ClientSessionController {
    private readonly clientSessionService;
    constructor(clientSessionService: ClientSessionService);
    signup(signupDto: ClientSignupDto): Promise<{
        data: {
            user: {
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string | null;
                uuid: string;
                password: string | null;
                phone: string | null;
                email: string;
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
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string | null;
                uuid: string;
                password: string | null;
                phone: string | null;
                email: string;
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
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
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
}
