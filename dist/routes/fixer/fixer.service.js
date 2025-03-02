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
exports.FixerService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let FixerService = class FixerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchFixerData(id) {
        try {
            const fixer = await this.prisma.fixerUser.findUnique({
                where: { userId: id },
                include: {
                    balance: true,
                    idCard: true,
                    stats: true,
                },
            });
            if (!fixer) {
                return {
                    data: {},
                    status: 404,
                    ok: false,
                    error: 'Fixer not found',
                };
            }
            const { password, ...result } = fixer;
            return {
                data: result,
                status: 200,
                ok: true,
                error: '',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to fetch fixer data',
                additionalInfo: {
                    details: error.message,
                    code: 'FIXER_FETCH_ERROR'
                },
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FixerService = FixerService;
exports.FixerService = FixerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], FixerService);
//# sourceMappingURL=fixer.service.js.map