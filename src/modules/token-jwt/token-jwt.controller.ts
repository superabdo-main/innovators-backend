import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenJwtService } from './token-jwt.service';
import { CreateTokenJwtDto } from './dto/create-token-jwt.dto';
import { UpdateTokenJwtDto } from './dto/update-token-jwt.dto';

@Controller('token-jwt')
export class TokenJwtController {
  constructor(private readonly tokenJwtService: TokenJwtService) {}


}
