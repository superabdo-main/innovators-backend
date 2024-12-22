import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { PlaystationService } from './playstation.service';
import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';

@Controller('playstation')
export class PlaystationController {
  constructor(private readonly playstationService: PlaystationService) {}

  @Post()
  create(@Body() createPlaystationDto: CreatePlaystationDto) {
    return this.playstationService.create(createPlaystationDto);
  }

  @Get('/fastat-service-options')
  async getFastatServiceOptions() {
    return await this.playstationService.getFastatServiceOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playstationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaystationDto: UpdatePlaystationDto) {
    return this.playstationService.update(+id, updatePlaystationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playstationService.remove(+id);
  }
}
