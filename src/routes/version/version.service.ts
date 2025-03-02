import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VersionService {
  constructor(private prisma: PrismaService){}

  async checkRelease(){
    try{
      const release = await this.prisma.versionRelease.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          version: true,
          releaseNotes: true,
          url: true
        }
      })
      return {data: release, ok: true, status: 200, error:''}
    } catch(error){
      return {data: {}, ok: false, status: 500, error:'An error occurred while checking release' }
    }
  }

}
