import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenJwtDto } from './create-token-jwt.dto';

export class UpdateTokenJwtDto extends PartialType(CreateTokenJwtDto) {}
