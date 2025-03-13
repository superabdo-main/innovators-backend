import { PrismaService } from 'nestjs-prisma';
export declare class OffersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getBanners(): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string;
            isActive: boolean;
            redirectUrl: string | null;
        }[];
        ok: boolean;
        status: number;
        error: string;
    }>;
}
