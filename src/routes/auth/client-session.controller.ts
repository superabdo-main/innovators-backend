import { Controller, Post, Body, UseGuards, Headers, HttpCode } from '@nestjs/common';
import { ClientSessionService } from './client-session.service';
import { ClientLoginDto, ClientSignupDto } from './dto/client-auth.dto';
import { ClientJwtGuard } from './guards/client-jwt.guard';

@Controller('auth/client')
export class ClientSessionController {
  constructor(private readonly clientSessionService: ClientSessionService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupDto: ClientSignupDto) {
    return this.clientSessionService.signup(signupDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: ClientLoginDto) {
    return this.clientSessionService.login(loginDto);
  }

  @Post('session/check')
  @HttpCode(200)
  async checkSession(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    return await this.clientSessionService.checkSession(token);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.clientSessionService.logout(token);
  }

  @Post('fcm-token')
  // @UseGuards(ClientJwtGuard)
  @HttpCode(200)
  async updateFcmToken(
    @Body() data: { userId: number; deviceId: string; fcmToken: string },
  ) {
    return this.clientSessionService.updateFcmToken(
      data.userId,
      data.deviceId,
      data.fcmToken,
    );
  }
}
