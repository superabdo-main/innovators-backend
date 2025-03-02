import { Controller, Post, Body, UseGuards, Headers, HttpCode } from '@nestjs/common';
import { FixerSessionService } from './fixer-session.service';
import { FixerLoginDto } from './dto/fixer-session.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth/fixer')
export class FixerSessionController {
  constructor(private readonly fixerSessionService: FixerSessionService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: FixerLoginDto) {
    return this.fixerSessionService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.fixerSessionService.logout(token);
  }
}
