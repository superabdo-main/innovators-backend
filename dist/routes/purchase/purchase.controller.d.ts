import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    create(createPurchaseDto: CreatePurchaseDto, auth: string): Promise<{
        data: {};
        ok: boolean;
        status: number;
        error: string;
    } | {
        data: {
            data: any;
            ok: boolean;
            status: number;
            error: string;
        };
        ok: boolean;
        status: number;
        error: string;
    }>;
}
