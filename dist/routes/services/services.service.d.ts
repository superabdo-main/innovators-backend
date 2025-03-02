import { PrismaService } from 'nestjs-prisma';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    getMainServices(): Promise<{
        data: {
            id: number;
            serviceName: string | null;
            serviceId: string | null;
            enabled: boolean | null;
            isOpen: boolean | null;
            imageUrl: string | null;
            sortNumber: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        ok: boolean;
        status: number;
        error: any;
    }>;
}
