import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly services;
    constructor(services: ServicesService);
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
