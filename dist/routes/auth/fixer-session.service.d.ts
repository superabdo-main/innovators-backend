import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { FixerLoginDto } from './dto/fixer-session.dto';
export declare class FixerSessionService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private deactivateExistingSessions;
    login(loginDto: FixerLoginDto): Promise<{
        token: string;
        fixer: {
            id: number;
            uuid: string;
            name: string;
        };
        session: {
            id: number;
            expiresAt: Date;
            deviceInfo: {
                deviceId: string;
                deviceModel: string;
                deviceOs: string;
            };
        };
    }>;
    validateSession(token: string): Promise<any>;
    logout(token: string): Promise<{
        message: string;
    }>;
}
