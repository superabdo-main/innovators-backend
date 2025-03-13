"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_service_1 = require("./purchase.service");
const purchase_controller_1 = require("./purchase.controller");
const orders_service_1 = require("../orders/orders.service");
const fixer_service_1 = require("../fixer/fixer.service");
const token_jwt_module_1 = require("../../modules/token-jwt/token-jwt.module");
const maintenance_time_service_1 = require("../maintenance/maintenance-time.service");
const fixer_assignment_service_1 = require("../fixer/fixer-assignment.service");
let PurchaseModule = class PurchaseModule {
};
exports.PurchaseModule = PurchaseModule;
exports.PurchaseModule = PurchaseModule = __decorate([
    (0, common_1.Module)({
        imports: [token_jwt_module_1.TokenJwtModule],
        controllers: [purchase_controller_1.PurchaseController],
        providers: [
            purchase_service_1.PurchaseService,
            fixer_assignment_service_1.FixerAssignmentService,
            orders_service_1.OrdersService,
            maintenance_time_service_1.MaintenanceTimePredictionService,
            fixer_service_1.FixerService,
        ],
    })
], PurchaseModule);
//# sourceMappingURL=purchase.module.js.map