import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class PlaystationService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updatePlaystationDto: UpdatePlaystationDto): string;
    remove(id: number): string;
}
