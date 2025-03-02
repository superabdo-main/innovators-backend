import { PrismaService } from 'nestjs-prisma';
export declare class VersionService {
    private prisma;
    constructor(prisma: PrismaService);
    checkRelease(): Promise<{
        data: {
            version: string;
            releaseNotes: string;
            url: string;
        };
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {};
        ok: boolean;
        status: number;
        error: string;
    }>;
}
