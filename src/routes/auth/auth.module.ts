import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientSessionController } from './client-session.controller';
import { FixerSessionController } from './fixer-session.controller';
import { ClientSessionService } from './client-session.service';
import { FixerSessionService } from './fixer-session.service';
import { ClientJwtStrategy } from './strategies/client-jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [ClientSessionController, FixerSessionController],
  providers: [ClientSessionService, FixerSessionService, ClientJwtStrategy],
})
export class AuthModule {}
