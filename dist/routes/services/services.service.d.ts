import { PrismaService } from 'nestjs-prisma';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    getMainServices(): Promise<{
        data: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            imageUrl: string | null;
            serviceId: string | null;
            sortNumber: number | null;
            serviceName: string | null;
            enabled: boolean | null;
            isOpen: boolean | null;
        }[];
        ok: boolean;
        status: number;
        error: any;
    }>;
}
