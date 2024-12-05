import { NestMiddleware } from '@nestjs/common';
import { LoggingGateway } from './logging.gateway';
export declare class LoggingMiddleware implements NestMiddleware {
    private readonly loggingGateway;
    constructor(loggingGateway: LoggingGateway);
    use(req: any, res: any, next: () => void): void;
}
