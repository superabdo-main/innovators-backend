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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_notification_service_1 = require("./orders-notification.service");
const order_notification_dto_1 = require("./dto/order-notification.dto");
let OrdersController = class OrdersController {
    constructor(ordersService, notificationService) {
        this.ordersService = ordersService;
        this.notificationService = notificationService;
    }
    async checkAndSendNotifications() {
        return this.notificationService.checkAndSendUpcomingOrderNotifications();
    }
    async sendOrderNotification(orderId, notificationDto) {
        if (!notificationDto.timeThreshold) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Time threshold is required (1-hour or 10-minutes)',
                additionalInfo: {
                    code: 'NOTIFICATION_TIME_THRESHOLD_REQUIRED',
                },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.notificationService.sendSpecificNotification(notificationDto.timeThreshold, +orderId);
    }
    async getClientActiveOrders(clientId) {
        return this.ordersService.getClientActiveOrders(+clientId);
    }
    async getClientCompletedOrders(clientId) {
        return this.ordersService.getClientFinishedOrders(+clientId);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)('notifications/check'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "checkAndSendNotifications", null);
__decorate([
    (0, common_1.Post)('notifications/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_notification_dto_1.OrderNotificationDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "sendOrderNotification", null);
__decorate([
    (0, common_1.Get)('client/:clientId/active'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getClientActiveOrders", null);
__decorate([
    (0, common_1.Get)('client/:clientId/completed'),
    __param(0, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getClientCompletedOrders", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        orders_notification_service_1.OrdersNotificationService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map