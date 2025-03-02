import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientSessionController } from './client-session.controller';
import { FixerSessionController } from './fixer-session.controller';
import { ClientSessionService } from './client-session.service';
import { FixerSessionService } from './fixer-session.service';
import { ClientJwtStrategy } from './strategies/client-jwt.strategy';

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
  controllers: [ClientSessionController, FixerSessionController],
  providers: [ClientSessionService, FixerSessionService, ClientJwtStrategy],
})
export class AuthModule {}
