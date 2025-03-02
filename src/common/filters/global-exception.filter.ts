import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { PrismaService } from 'nestjs-prisma';
import * as path from 'path';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private prisma: PrismaService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get the response object from HttpException
    const errorResponse = exception instanceof HttpException
      ? exception.getResponse()
      : {
          status,
          error: 'Internal server error',
          message: exception.message
        };

    // Prepare the final error response
    const finalResponse = {
      ...(typeof errorResponse === 'object' ? errorResponse : { message: errorResponse }),
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    // Save to database
    await this.prisma.errorLog.create({
      data: {
        statusCode: status,
        message: typeof errorResponse === 'object' ? JSON.stringify(errorResponse) : errorResponse,
        stack: exception.stack,
        path: request.url,
        method: request.method,
        metadata: request.body || {},
      },
    });

    // Save to file
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
    const logMessage = `${new Date().toISOString()} [${status}] ${request.method} ${request.url}: ${JSON.stringify(errorResponse)}\n${exception.stack}\n\n`;

    fs.appendFileSync(logFile, logMessage);

    response.status(status).json(finalResponse);
  }
}