import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from 'nestjs-prisma';
import { OrdersService } from 'src/routes/orders/orders.service';
import { TokenJwtService } from 'src/modules/token-jwt/token-jwt.service';
import { MaintenanceTimePredictionService } from '../maintenance/maintenance-time.service';
export declare class PurchaseService {
    private readonly prisma;
    private orderService;
    private tokenService;
    private maintenanceTimeService;
    constructor(prisma: PrismaService, orderService: OrdersService, tokenService: TokenJwtService, maintenanceTimeService: MaintenanceTimePredictionService);
    create(token: string, purchaseData: CreatePurchaseDto): Promise<{
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
