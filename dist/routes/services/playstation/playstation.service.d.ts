import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
import { PrismaService } from 'nestjs-prisma';
export declare class PlaystationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPlaystationDto: CreatePlaystationDto): string;
    findOne(id: number): string;
    update(id: number, updatePlaystationDto: UpdatePlaystationDto): string;
    remove(id: number): string;
}
