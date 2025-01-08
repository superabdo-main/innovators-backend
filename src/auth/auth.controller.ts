import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateFixerAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto'
import { AuthDto, FixerAuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/fixer/create')
  createFixerUser(@Body() createAuthDto: CreateFixerAuthDto) {
    return this.authService.createFixerUser(createAuthDto);
  }

  @Post('/login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
  
  @Post('/fixer/login')
  fixerLogin(@Body() authDto: FixerAuthDto) {
    return this.authService.fixerLogin(authDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
