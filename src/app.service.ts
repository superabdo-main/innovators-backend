import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){}
  getHello(): string {
    return 'Hello World!';
  }

  async getVersion() {
    return await this.prisma.settings.findFirst({select: {app_version: true, last_release: true}});
  }


  async getFixerVersion() {
    return await this.prisma.settings.findFirst({select: {fixer_app_version: true, fixer_app_release: true}});
  }

}
