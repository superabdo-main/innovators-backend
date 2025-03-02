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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const nestjs_prisma_1 = require("nestjs-prisma");
const path = require("path");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : {
                status,
                error: 'Internal server error',
                message: exception.message
            };
        const finalResponse = {
            ...(typeof errorResponse === 'object' ? errorResponse : { message: errorResponse }),
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        };
        await this.prisma.errorLog.create({
            data: {
                statusCode: status,
                message: typeof errorResponse === 'object' ? JSON.stringify(errorResponse) : errorResponse,
                stack: exception.stack,
                path: request.url,
                method: request.method,
                metadata: request.body || {},
            },
        });
        const logDir = path.join(process.cwd(), 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
        const logMessage = `${new Date().toISOString()} [${status}] ${request.method} ${request.url}: ${JSON.stringify(errorResponse)}\n${exception.stack}\n\n`;
        fs.appendFileSync(logFile, logMessage);
        response.status(status).json(finalResponse);
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], GlobalExceptionFilter);
//# sourceMappingURL=global-exception.filter.js.map