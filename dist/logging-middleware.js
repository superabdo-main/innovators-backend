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
exports.LoggingMiddleware = void 0;
const common_1 = require("@nestjs/common");
const logging_gateway_1 = require("./logging.gateway");
let LoggingMiddleware = class LoggingMiddleware {
    constructor(loggingGateway) {
        this.loggingGateway = loggingGateway;
    }
    use(req, res, next) {
        const before = Date.now();
        res.on('finish', () => {
            const after = Date.now();
            const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const logMessage = `Method: ${req.method}, URL: ${req.originalUrl}, IP: ${clientIp}, Time: ${after - before}ms`;
            console.log(logMessage);
            this.loggingGateway.logMessage(logMessage);
        });
        next();
    }
};
exports.LoggingMiddleware = LoggingMiddleware;
exports.LoggingMiddleware = LoggingMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_gateway_1.LoggingGateway])
], LoggingMiddleware);
//# sourceMappingURL=logging-middleware.js.map