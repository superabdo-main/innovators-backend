import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'nestjs-prisma';
import { AuthDto } from './dto/auth.dto';
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
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
    checkEmail(email: string): Promise<boolean>;
}
