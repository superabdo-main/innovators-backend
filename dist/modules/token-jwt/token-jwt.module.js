"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenJwtModule = void 0;
const common_1 = require("@nestjs/common");
const token_jwt_service_1 = require("./token-jwt.service");
const token_jwt_controller_1 = require("./token-jwt.controller");
const jwt_1 = require("@nestjs/jwt");
let TokenJwtModule = class TokenJwtModule {
};
exports.TokenJwtModule = TokenJwtModule;
exports.TokenJwtModule = TokenJwtModule = __decorate([
    (0, common_1.Module)({
        controllers: [token_jwt_controller_1.TokenJwtController],
        providers: [token_jwt_service_1.TokenJwtService, jwt_1.JwtService],
    })
], TokenJwtModule);
//# sourceMappingURL=token-jwt.module.js.map