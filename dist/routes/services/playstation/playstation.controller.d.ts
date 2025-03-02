import { PlaystationService } from './playstation.service';
import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
export declare class PlaystationController {
    private readonly playstationService;
    constructor(playstationService: PlaystationService);
    create(createPlaystationDto: CreatePlaystationDto): string;
    findOne(id: string): string;
    update(id: string, updatePlaystationDto: UpdatePlaystationDto): string;
    remove(id: string): string;
}
