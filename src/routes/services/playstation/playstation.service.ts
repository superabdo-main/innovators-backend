import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaystationDto } from './dto/create-playstation.dto';
import { UpdatePlaystationDto } from './dto/update-playstation.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PlaystationService {
  constructor(private prisma: PrismaService) {}

  create(createPlaystationDto: CreatePlaystationDto) {
    return 'This action adds a new playstation';
  }

  async getFastatServiceOptions() {
    try {
      const items = await this.prisma.playStationFastatCategory.findMany({
        where: {
          active: true,
        },
        include: {
          items: {
            where: {
              active: true
            },
            include: {
              sku: true,
            },
            orderBy: {
              sortNumber: 'asc',
            }
          },
        },
        orderBy: {
          sortNumber: 'asc',
        }
      });
      return {
        data: items,
        ok: true,
        status: 200,
        error: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get fastat service options',
          additionalInfo: {
            details: error.message,
            code: 'PLAYSTATION_GET_FASTAT_SERVICE_OPTIONS_ERROR',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
