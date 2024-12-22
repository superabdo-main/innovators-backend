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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAuthDto) {
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
            const hashedPassword = await bcrypt.hash(createAuthDto.password, saltRounds);
            const auth = await this.prisma.auth.create({
                data: {
                    ...createAuthDto,
                    password: hashedPassword,
                },
            });
            const { password, ...result } = auth;
            return { data: result, status: 201, ok: true, error: '' };
        }
        catch (error) {
            return {
                data: {},
                status: 205,
                ok: false,
                error: 'An error occurred while creating the auth',
            };
        }
    }
    async login(authDto) {
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
            const isPasswordMatch = await bcrypt.compare(authDto.password, auth.password);
            if (isPasswordMatch) {
                const { password, ...result } = auth;
                return { data: result, status: 201, ok: true, error: '' };
            }
            return { data: {}, status: 201, ok: false, error: 'Invalid credentials' };
        }
        catch (error) {
            return {
                data: {},
                status: 205,
                ok: false,
                error: 'An error occurred while logging in',
            };
        }
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
    async checkEmail(email) {
        const check = await this.prisma.auth.findUnique({
            where: {
                email: email,
            },
        });
        if (check)
            return true;
        return false;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map