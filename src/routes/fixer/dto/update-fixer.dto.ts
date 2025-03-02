import { PartialType } from '@nestjs/mapped-types';
import { CreateFixerDto } from './create-fixer.dto';

export class UpdateFixerDto extends PartialType(CreateFixerDto) {}
