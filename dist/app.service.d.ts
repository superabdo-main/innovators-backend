import { PrismaService } from 'nestjs-prisma';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    getVersion(): Promise<{
        app_version: string;
        last_release: string;
    }>;
    getFixerVersion(): Promise<{
        fixer_app_version: string;
        fixer_app_release: string;
    }>;
}
