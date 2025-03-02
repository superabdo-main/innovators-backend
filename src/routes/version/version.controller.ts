import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}



  @Get('')
  async findOne() {
    return await this.versionService.checkRelease();
  }

}
