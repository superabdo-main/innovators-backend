import { Module } from '@nestjs/common';
import { TokenJwtService } from './token-jwt.service';
import { TokenJwtController } from './token-jwt.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TokenJwtController],
  providers: [TokenJwtService, JwtService],
})
export class TokenJwtModule {}
