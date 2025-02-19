import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FixerService } from './fixer.service';

@Controller('fixer')
export class FixerController {
  constructor(private readonly fixerService: FixerService) {}

  @Get('fetch-data/:id')
  fetchFixerData(@Param('id', ParseIntPipe) id: string) {
    return this.fixerService.fetchFixerData(id);
  }
}
