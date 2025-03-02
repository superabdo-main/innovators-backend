import { Injectable } from '@nestjs/common';
import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PlaystationService {
  constructor(private prisma: PrismaService) {}

  create(createPlaystationDto: CreatePlaystationDto) {
    return 'This action adds a new playstation';
  }

  // async getFastatServiceOptions() {
  //   try {
  //     const items =
  //       await this.prisma.playStationFastatServiceOptions.findMany({
  //         where: {
  //           enabled: true,
  //         },
  //         select: {
  //           id: true,
  //           name: true,
  //           subTitle:true,
  //           items: {
  //             where: {
  //               enabled: true,
  //             },

  //             select: {
  //               id: true,
  //               name: true,
  //               price: true,
  //               stock: true,
  //               serviceId: true,
  //               maintenanceTime: true,
  //             },
  //           },
  //         },
  //         orderBy: {
  //           id: 'asc',
  //         },
  //       });

  //     return { data: items, status: 200, ok: true, error: '' };
  //   } catch (error) {
  //     return {
  //       data: [],
  //       ok: false,
  //       error: 'An error occurred while fetching the data',
  //     };
  //   }
  // }

  findOne(id: number) {
    return `This action returns a #${id} playstation`;
  }

  update(id: number, updatePlaystationDto: UpdatePlaystationDto) {
    return `This action updates a #${id} playstation`;
  }

  remove(id: number) {
    return `This action removes a #${id} playstation`;
  }
}
