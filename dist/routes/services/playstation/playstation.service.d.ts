import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class PlaystationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPlaystationDto: CreatePlaystationDto): string;
    getFastatServiceOptions(): Promise<{
        data: ({
            items: ({
                sku: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    discount: number | null;
                    price: number | null;
                    stock: number | null;
                };
            } & {
                id: number;
                name: string | null;
                createdAt: Date;
                updatedAt: Date;
                active: boolean | null;
                maintenanceTime: number | null;
                categoryId: number | null;
                serviceId: number | null;
                sortNumber: number | null;
                skuId: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            active: boolean | null;
            sortNumber: number | null;
            subTitle: string | null;
        })[];
        ok: boolean;
        status: number;
        error: string;
    }>;
    findOne(id: number): string;
    update(id: number, updatePlaystationDto: UpdatePlaystationDto): string;
    remove(id: number): string;
}
