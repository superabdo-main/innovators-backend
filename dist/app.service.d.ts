import { PrismaService } from 'nestjs-prisma';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    getVersion(): Promise<{
        app_version: string;
        last_release: string;
    }>;
}
