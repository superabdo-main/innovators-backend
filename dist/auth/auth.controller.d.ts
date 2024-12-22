import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
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
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
