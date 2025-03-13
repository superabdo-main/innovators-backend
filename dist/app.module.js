"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_prisma_1 = require("nestjs-prisma");
const logging_gateway_1 = require("./logging.gateway");
const logging_middleware_1 = require("./logging-middleware");
const purchase_module_1 = require("./routes/purchase/purchase.module");
const auth_module_1 = require("./routes/auth/auth.module");
const playstation_module_1 = require("./routes/services/playstation/playstation.module");
const fixer_module_1 = require("./routes/fixer/fixer.module");
const orders_module_1 = require("./routes/orders/orders.module");
const services_module_1 = require("./routes/services/services.module");
const maintenance_module_1 = require("./routes/maintenance/maintenance.module");
const client_module_1 = require("./routes/client/client.module");
const version_module_1 = require("./routes/version/version.module");
const token_jwt_module_1 = require("./modules/token-jwt/token-jwt.module");
const coupons_module_1 = require("./routes/coupons/coupons.module");
const offers_module_1 = require("./routes/offers/offers.module");
const notification_module_1 = require("./modules/notifications/notification.module");
const admin = require("firebase-admin");
const common_2 = require("@nestjs/common");
const firebase_module_1 = require("./firebase.module");
let AppModule = AppModule_1 = class AppModule {
    constructor() {
        this.logger = new common_2.Logger(AppModule_1.name);
    }
    onModuleInit() {
        if (!admin.apps.length) {
            try {
                admin.initializeApp({
                    credential: admin.credential.applicationDefault(),
                });
                this.logger.log('Firebase Admin SDK initialized successfully');
            }
            catch (error) {
                this.logger.error(`Failed to initialize Firebase Admin SDK: ${error.message}`, error.stack);
            }
        }
    }
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.LoggingMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prisma_1.PrismaModule.forRoot({
                isGlobal: true,
            }),
            purchase_module_1.PurchaseModule,
            auth_module_1.AuthModule,
            playstation_module_1.PlaystationModule,
            fixer_module_1.FixerModule,
            orders_module_1.OrdersModule,
            services_module_1.ServicesModule,
            maintenance_module_1.MaintenanceModule,
            client_module_1.ClientModule,
            version_module_1.VersionModule,
            token_jwt_module_1.TokenJwtModule,
            coupons_module_1.CouponsModule,
            offers_module_1.OffersModule,
            notification_module_1.NotificationModule,
            firebase_module_1.FirebaseModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logging_gateway_1.LoggingGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map