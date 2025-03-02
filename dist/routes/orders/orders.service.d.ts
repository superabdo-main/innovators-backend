import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'nestjs-prisma';
import { FixerService } from 'src/routes/fixer/fixer.service';
export declare class OrdersService {
    private prisma;
    private fixerService;
    constructor(prisma: PrismaService, fixerService: FixerService);
    create(purchaseId: number, startDate: Date): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
