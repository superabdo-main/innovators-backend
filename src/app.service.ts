import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello() {
    try {

      return {
        message: 'Hello World!',
      };
    } catch (error) {
      // Re-throw the error to be caught by the global exception filter
      throw error;
    }
  }

  async getFixerVersion() {
    return await this.prisma.settings.findFirst({
      select: { fixer_app_version: true, fixer_app_release: true },
    });
  }
}
