import { PlaystationService } from './playstation.service';
import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
export declare class PlaystationController {
    private readonly playstationService;
    constructor(playstationService: PlaystationService);
    create(createPlaystationDto: CreatePlaystationDto): string;
    getFastatServiceOptions(): Promise<{
        data: {
            id: number;
            name: string;
            items: {
                id: number;
                name: string;
                price: number;
                stock: number;
                serviceId: number;
            }[];
            subTitle: string;
        }[];
        status: number;
        ok: boolean;
        error: string;
    } | {
        data: any[];
        ok: boolean;
        error: string;
        status?: undefined;
    }>;
    findOne(id: string): string;
    update(id: string, updatePlaystationDto: UpdatePlaystationDto): string;
    remove(id: string): string;
}
