import { Injectable } from '@nestjs/common';
import { CreateAuthDto, CreateFixerAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { AuthDto, FixerAuthDto } from './dto/auth.dto';
import { generateUUID } from 'src/utils/uuid';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const checkAuthEmail = await this.checkEmail(createAuthDto.email);
      if (checkAuthEmail)
        return {
          data: {},
          status: 201,
          ok: false,
          error: 'Email already exists',
        };
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createAuthDto.password,
        saltRounds,
      );

      const auth = await this.prisma.auth.create({
        data: {
          ...createAuthDto,
          password: hashedPassword,
        },
      });

      const { password, ...result } = auth;
      return { data: result, status: 201, ok: true, error: '' };
    } catch (error) {
      return {
        data: {},
        status: 205,
        ok: false,
        error: 'An error occurred while creating the auth',
      };
    }
  }

  async createFixerUser(createAuthDto: CreateFixerAuthDto) {
    try {
      const { uuid } = createAuthDto;

      const auth = await this.prisma.fixerUser.create({
        data: {
          ...createAuthDto,
          uuid: uuid || generateUUID(),
          balance: {
            create: {},
          },
          idCard: {
            create: {},
          },
          stats: {
            create: {},
          },
        },
      });

      const { password, ...result } = auth;
      return { data: result, status: 201, ok: true, error: '' };
    } catch (error) {
      console.log(error);

      return {
        data: {},
        status: 205,
        ok: false,
        error: 'An error occurred while creating the auth',
      };
    }
  }

  async login(authDto: AuthDto) {
    try {
      const auth = await this.prisma.auth.findUnique({
        where: {
          email: authDto.email,
        },
      });

      if (!auth)
        return {
          data: {},
          status: 201,
          ok: false,
          error: 'Invalid credentials',
        };

      const isPasswordMatch = await bcrypt.compare(
        authDto.password,
        auth.password,
      );

      if (isPasswordMatch) {
        const { password, ...result } = auth;
        return { data: result, status: 201, ok: true, error: '' };
      }
      return { data: {}, status: 201, ok: false, error: 'Invalid credentials' };
    } catch (error) {
      return {
        data: {},
        status: 205,
        ok: false,
        error: 'An error occurred while logging in',
      };
    }
  }

  async fixerLogin(authDto: FixerAuthDto) {
    try {
      const auth = await this.prisma.fixerUser.findUnique({
        where: {
          uuid: authDto.uuid,
          AND: {
            password: authDto.password,
          },
        },
        include: {
          balance: true,
          idCard: true,
          stats: true,
        },
      });
      
      if (!auth)
        return {
          data: {},
          status: 201,
          ok: false,
          error: 'Invalid credentials',
        };
      const { password, ...result } = auth;
      return { data: result, status: 201, ok: true, error: '' };
    } catch (error) {      
      return {
        data: {},
        status: 205,
        ok: false,
        error: 'An error occurred while logging in',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async checkEmail(email: string) {
    const check = await this.prisma.auth.findUnique({
      where: {
        email: email,
      },
    });
    if (check) return true;
    return false;
  }
}
