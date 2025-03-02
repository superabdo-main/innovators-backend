import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaystationDto } from './create-playstation.dto';

export class UpdatePlaystationDto extends PartialType(CreatePlaystationDto) {}
