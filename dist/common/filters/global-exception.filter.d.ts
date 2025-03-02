import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private prisma;
    constructor(prisma: PrismaService);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
}
