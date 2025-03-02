import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Get('')
  async getMainServices(){
    return await this.services.getMainServices();
  }
}