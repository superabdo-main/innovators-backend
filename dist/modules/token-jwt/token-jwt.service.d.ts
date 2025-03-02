import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
export declare class TokenJwtService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    decodeToken(token: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string | null;
        uuid: string;
        password: string | null;
        phone: string | null;
        email: string;
    }>;
}
