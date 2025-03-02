import { ExecutionContext } from '@nestjs/common';
import { FixerSessionService } from '../fixer-session.service';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly fixerSessionService;
    constructor(fixerSessionService: FixerSessionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
export {};
