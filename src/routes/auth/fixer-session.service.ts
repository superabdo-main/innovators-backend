import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FixerLoginDto } from './dto/fixer-session.dto';

@Injectable()
export class FixerSessionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async deactivateExistingSessions(fixerId: number) {
    await this.prisma.session.updateMany({
      where: {
        fixerId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  async login(loginDto: FixerLoginDto) {
    const { uuid, password, deviceInfo } = loginDto;

    // Find the fixer
    const fixer = await this.prisma.fixerUser.findUnique({
      where: { uuid },
    });

    if (!fixer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, fixer.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Deactivate existing sessions
    await this.deactivateExistingSessions(fixer.id);

    // Generate JWT token
    const payload = { 
      sub: fixer.id,
      uuid: fixer.uuid,
    };
    
    const token = this.jwtService.sign(payload);
    const tokenHash = await bcrypt.hash(token, 10);

    // Create new session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days session

    const session = await this.prisma.session.create({
      data: {
        token: tokenHash,
        fixerId: fixer.id,
        deviceId: deviceInfo.deviceId,
        deviceModel: deviceInfo.deviceModel,
        deviceOs: deviceInfo.deviceOs,
        expiresAt,
      },
    });

    return {
      token,
      fixer: {
        id: fixer.id,
        uuid: fixer.uuid,
        name: fixer.name,
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
        deviceInfo: {
          deviceId: session.deviceId,
          deviceModel: session.deviceModel,
          deviceOs: session.deviceOs,
        },
      },
    };
  }

  async validateSession(token: string) {
    try {
      // Verify JWT token
      const payload = this.jwtService.verify(token);
      const tokenHash = await bcrypt.hash(token, 10);

      // Find active session
      const session = await this.prisma.session.findFirst({
        where: {
          token: tokenHash,
          fixerId: payload.sub,
          isActive: true,
          expiresAt: {
            gt: new Date(),
          },
        },
      });

      if (!session) {
        throw new UnauthorizedException('Invalid or expired session');
      }

      // Update last activity
      await this.prisma.session.update({
        where: { id: session.id },
        data: { lastActivity: new Date() },
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }

  async logout(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const tokenHash = await bcrypt.hash(token, 10);

      await this.prisma.session.updateMany({
        where: {
          token: tokenHash,
          fixerId: payload.sub,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });

      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid session');
    }
  }
}
