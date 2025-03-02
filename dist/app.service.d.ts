import { PrismaService } from 'nestjs-prisma';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getHello(): Promise<{
        message: string;
    }>;
    getFixerVersion(): Promise<{
        fixer_app_version: string;
        fixer_app_release: string;
    }>;
}
