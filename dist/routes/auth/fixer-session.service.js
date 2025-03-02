"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixerSessionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let FixerSessionService = class FixerSessionService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async deactivateExistingSessions(fixerId) {
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
    async login(loginDto) {
        const { uuid, password, deviceInfo } = loginDto;
        const fixer = await this.prisma.fixerUser.findUnique({
            where: { uuid },
        });
        if (!fixer) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, fixer.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.deactivateExistingSessions(fixer.id);
        const payload = {
            sub: fixer.id,
            uuid: fixer.uuid,
        };
        const token = this.jwtService.sign(payload);
        const tokenHash = await bcrypt.hash(token, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);
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
    async validateSession(token) {
        try {
            const payload = this.jwtService.verify(token);
            const tokenHash = await bcrypt.hash(token, 10);
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
                throw new common_1.UnauthorizedException('Invalid or expired session');
            }
            await this.prisma.session.update({
                where: { id: session.id },
                data: { lastActivity: new Date() },
            });
            return payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired session');
        }
    }
    async logout(token) {
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
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
    }
};
exports.FixerSessionService = FixerSessionService;
exports.FixerSessionService = FixerSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        jwt_1.JwtService])
], FixerSessionService);
//# sourceMappingURL=fixer-session.service.js.map