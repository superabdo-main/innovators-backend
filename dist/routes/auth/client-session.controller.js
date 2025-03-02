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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSessionController = void 0;
const common_1 = require("@nestjs/common");
const client_session_service_1 = require("./client-session.service");
const client_auth_dto_1 = require("./dto/client-auth.dto");
const client_jwt_guard_1 = require("./guards/client-jwt.guard");
let ClientSessionController = class ClientSessionController {
    constructor(clientSessionService) {
        this.clientSessionService = clientSessionService;
    }
    async signup(signupDto) {
        return this.clientSessionService.signup(signupDto);
    }
    async login(loginDto) {
        return this.clientSessionService.login(loginDto);
    }
    async checkSession(auth) {
        const token = auth.replace('Bearer ', '');
        return await this.clientSessionService.checkSession(token);
    }
    async logout(auth) {
        const token = auth.replace('Bearer ', '');
        return this.clientSessionService.logout(token);
    }
};
exports.ClientSessionController = ClientSessionController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_dto_1.ClientSignupDto]),
    __metadata("design:returntype", Promise)
], ClientSessionController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_auth_dto_1.ClientLoginDto]),
    __metadata("design:returntype", Promise)
], ClientSessionController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('session/check'),
    (0, common_1.UseGuards)(client_jwt_guard_1.ClientJwtGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientSessionController.prototype, "checkSession", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(client_jwt_guard_1.ClientJwtGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientSessionController.prototype, "logout", null);
exports.ClientSessionController = ClientSessionController = __decorate([
    (0, common_1.Controller)('auth/client'),
    __metadata("design:paramtypes", [client_session_service_1.ClientSessionService])
], ClientSessionController);
//# sourceMappingURL=client-session.controller.js.map