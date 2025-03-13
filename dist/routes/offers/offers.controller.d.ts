import { OffersService } from './offers.service';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
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
