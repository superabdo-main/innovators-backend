import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientLoginDto, ClientSignupDto } from './dto/client-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { generateUUID } from 'src/utils/uuid';

@Injectable()
export class ClientSessionService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: ClientSignupDto) {
    try {
      // Check if user exists
      const userExists = await this.prisma.clientUser.findUnique({
        where: { email: dto.email },
      });

      if (userExists) {
        return {
          data: {},
          ok: false,
          status: 400,
          error: 'Email already registered',
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create user
      const user = await this.prisma.clientUser.create({
        data: {
          uuid: generateUUID(),
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          phone: dto.phone,
        },
      });

      // Create session
      const token = await this.generateToken(user.id, user.email);
      await this.createSession(user.id, token, dto.device);

      delete user.password;
      return { data: { user, token }, ok: true, status: 201, error: '' };
    } catch (error) {
      return {
        data: {},
        ok: false,
        status: 500,
        error: error,
      };
    }
  }

  async login(dto: ClientLoginDto) {
    try {
      // Find user
      const user = await this.prisma.clientUser.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        return {
          data: {},
          ok: false,
          status: 401,
          error: 'Invalid credentials',
        };
      }

      // Verify password
      const passwordValid = await bcrypt.compare(dto.password, user.password);
      if (!passwordValid) {
        return {
          data: {},
          ok: false,
          status: 401,
          error: 'Invalid credentials',
        };
      }

      await this.deactivateExistingSessions(user.id);

      // Create session
      const token = await this.generateToken(user.id, user.email);
      await this.createSession(user.id, token, dto.device);

      delete user.password;
      return { data: { user, token }, ok: true, status: 201, error: '' };
    } catch (error) {
      console.log(error);
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while logging in',
      };
    }
  }

  async logout(token: string) {
    // Delete session
    await this.prisma.clientSession.updateMany({
      where: { token: token },
      data: {
        isActive: false,
      },
    });

    return { data: {}, ok: true, status: 200, error: '' };
  }

  private async generateToken(userId: number, email: string): Promise<string> {
    try {
      const payload = { sub: userId, email };
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new UnauthorizedException(`Failed to generate token ${error}`);
    }
  }

  private async createSession(
    userId: number,
    token: string,
    device: { deviceId: string; deviceModel: string; deviceOs: string },
  ) {
    try {
      return this.prisma.clientSession.create({
        data: {
          client: { connect: { id: userId } },
          token: token,
          deviceId: device.deviceId,
          deviceModel: device.deviceModel,
          deviceOs: device.deviceOs,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });
    } catch (error) {
      throw new UnauthorizedException(`Failed to create session ${error}`);
    }
  }

  // Update FCM token for a client session
  async updateFcmToken(userId: number, deviceId: string, fcmToken: string) {
    try {
      // Update FCM token for the specific device
      const client = await this.prisma.clientSession.updateMany({
        where: {
          userId: userId,
          deviceId: deviceId,
          isActive: true,
        },
        data: {
          fcmToken: fcmToken,
          lastActivity: new Date(),
        },
      });
      return { 
        data: { success: true }, 
        ok: true, 
        status: 200, 
        error: '' 
      };
    } catch (error) {
      console.error('Failed to update FCM token:', error);
      return { 
        data: { success: false }, 
        ok: false, 
        status: 500, 
        error: 'Failed to update FCM token' 
      };
    }
  }

  private async deactivateExistingSessions(userId: number) {
    await this.prisma.clientSession.updateMany({
      where: {
        client: { id: userId },
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  public async checkSession(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const session = await this.prisma.clientSession.findFirst({
        where: {
          token: token,
          client: { id: payload.sub },
          isActive: true,
        },
      });
      
      if (!session) {
        return {
          data: {},
          ok: false,
          status: 401,
          error: 'Invalid session',
        };
      }

      await this.prisma.clientSession.update({
        where: { id: session.id },
        data: {
          lastActivity: new Date(),
        },
      });

      return { data: session, ok: true, status: 200, error: '' };
    } catch (error) {
      return {
        data: {},
        ok: false,
        status: 500,
        error: 'An error occurred while checking session',
      };
    }
  }
}
