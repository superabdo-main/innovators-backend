import { Module } from '@nestjs/common';
import { TokenJwtService } from './token-jwt.service';
import { TokenJwtController } from './token-jwt.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET || 'secret',
        signOptions: {
          expiresIn: '30d',
        },
      }),
    }),
  ],
  controllers: [TokenJwtController],
  providers: [TokenJwtService],
  exports: [TokenJwtService],
})
export class TokenJwtModule {}
