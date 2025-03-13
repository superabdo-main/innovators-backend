import { PlaystationService } from './playstation.service';
import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
export declare class PlaystationController {
    private readonly playstationService;
    constructor(playstationService: PlaystationService);
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
    findOne(id: string): string;
    update(id: string, updatePlaystationDto: UpdatePlaystationDto): string;
    remove(id: string): string;
}
