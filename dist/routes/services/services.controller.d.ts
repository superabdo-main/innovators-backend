import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly services;
    constructor(services: ServicesService);
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
