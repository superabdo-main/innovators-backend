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
exports.ClientSessionService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const nestjs_prisma_1 = require("nestjs-prisma");
const uuid_1 = require("../../utils/uuid");
let ClientSessionService = class ClientSessionService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(dto) {
        try {
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
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.prisma.clientUser.create({
                data: {
                    uuid: (0, uuid_1.generateUUID)(),
                    email: dto.email,
                    password: hashedPassword,
                    name: dto.name,
                    phone: dto.phone,
                },
            });
            const token = await this.generateToken(user.id, user.email);
            await this.createSession(user.id, token, dto.device);
            delete user.password;
            return { data: { user, token }, ok: true, status: 201, error: '' };
        }
        catch (error) {
            return {
                data: {},
                ok: false,
                status: 500,
                error: error,
            };
        }
    }
    async login(dto) {
        try {
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
            const token = await this.generateToken(user.id, user.email);
            await this.createSession(user.id, token, dto.device);
            delete user.password;
            return { data: { user, token }, ok: true, status: 201, error: '' };
        }
        catch (error) {
            console.log(error);
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while logging in',
            };
        }
    }
    async logout(token) {
        await this.prisma.clientSession.updateMany({
            where: { token: token },
            data: {
                isActive: false,
            },
        });
        return { data: {}, ok: true, status: 200, error: '' };
    }
    async generateToken(userId, email) {
        try {
            const payload = { sub: userId, email };
            return await this.jwtService.signAsync(payload);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(`Failed to generate token ${error}`);
        }
    }
    async createSession(userId, token, device) {
        try {
            return this.prisma.clientSession.create({
                data: {
                    client: { connect: { id: userId } },
                    token: token,
                    deviceId: device.deviceId,
                    deviceModel: device.deviceModel,
                    deviceOs: device.deviceOs,
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                },
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException(`Failed to create session ${error}`);
        }
    }
    async updateFcmToken(userId, deviceId, fcmToken) {
        try {
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
        }
        catch (error) {
            console.error('Failed to update FCM token:', error);
            return {
                data: { success: false },
                ok: false,
                status: 500,
                error: 'Failed to update FCM token'
            };
        }
    }
    async deactivateExistingSessions(userId) {
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
    async checkSession(token) {
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
        }
        catch (error) {
            return {
                data: {},
                ok: false,
                status: 500,
                error: 'An error occurred while checking session',
            };
        }
    }
};
exports.ClientSessionService = ClientSessionService;
exports.ClientSessionService = ClientSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        jwt_1.JwtService])
], ClientSessionService);
//# sourceMappingURL=client-session.service.js.map