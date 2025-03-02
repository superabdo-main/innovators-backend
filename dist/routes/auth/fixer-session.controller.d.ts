import { FixerSessionService } from './fixer-session.service';
import { FixerLoginDto } from './dto/fixer-session.dto';
export declare class FixerSessionController {
    private readonly fixerSessionService;
    constructor(fixerSessionService: FixerSessionService);
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
    logout(auth: string): Promise<{
        message: string;
    }>;
}
