"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_prisma_1 = require("nestjs-prisma");
const logging_gateway_1 = require("./logging.gateway");
const logging_middleware_1 = require("./logging-middleware");
const user_module_1 = require("./user/user.module");
const purchase_module_1 = require("./purchase/purchase.module");
const auth_module_1 = require("./auth/auth.module");
const playstation_module_1 = require("./services/playstation/playstation.module");
const fixer_module_1 = require("./fixer/fixer.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.LoggingMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prisma_1.PrismaModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            purchase_module_1.PurchaseModule,
            auth_module_1.AuthModule,
            playstation_module_1.PlaystationModule,
            fixer_module_1.FixerModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logging_gateway_1.LoggingGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map