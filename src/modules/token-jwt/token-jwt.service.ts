import { Injectable } from '@nestjs/common';
import { CreateTokenJwtDto } from './dto/create-token-jwt.dto';
import { UpdateTokenJwtDto } from './dto/update-token-jwt.dto';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenJwtService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async decodeToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const session = await this.prisma.clientSession.findFirst({
        where: {
          token: token,
          client: { id: payload.sub },
          isActive: true,
        },
        select: {
          client: true,
        },
      });
      // console.log(session);
      return session.client
    } catch (error) {
      // console.log(error);
      return null
    }
  }
}
