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
exports.VersionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let VersionService = class VersionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkRelease() {
        try {
            const release = await this.prisma.versionRelease.findFirst({
                orderBy: {
                    createdAt: 'desc',
                },
                select: {
                    version: true,
                    releaseNotes: true,
                    url: true
                }
            });
            return { data: release, ok: true, status: 200, error: '' };
        }
        catch (error) {
            return { data: {}, ok: false, status: 500, error: 'An error occurred while checking release' };
        }
    }
};
exports.VersionService = VersionService;
exports.VersionService = VersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], VersionService);
//# sourceMappingURL=version.service.js.map