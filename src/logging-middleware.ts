// src/logging-middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LoggingGateway } from './logging.gateway';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingGateway: LoggingGateway) {}

  use(req: any, res: any, next: () => void) {
    const before = Date.now();

    res.on('finish', () => {
      const after = Date.now();
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const logMessage = `Method: ${req.method}, URL: ${req.originalUrl}, IP: ${clientIp}, Time: ${after - before}ms`;
      console.log(logMessage);
      this.loggingGateway.logMessage(logMessage); // Emit log message
    });

    next();
  }
}