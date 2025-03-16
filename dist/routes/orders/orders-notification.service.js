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
var OrdersNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersNotificationService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const notification_service_1 = require("../../modules/notifications/notification.service");
const order_notification_dto_1 = require("./dto/order-notification.dto");
let OrdersNotificationService = OrdersNotificationService_1 = class OrdersNotificationService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(OrdersNotificationService_1.name);
    }
    async checkAndSendUpcomingOrderNotifications() {
        try {
            this.logger.debug('Checking for upcoming orders to send notifications...');
            const now = new Date();
            const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
            const upcomingOrders = await this.prisma.orderOperator.findMany({
                where: {
                    maintenanceStartDate: {
                        gte: now,
                        lte: oneHourFromNow,
                    },
                    status: 'PENDING',
                },
                include: {
                    purchase: {
                        include: {
                            client: true,
                        },
                    },
                },
            });
            const notificationResults = [];
            for (const order of upcomingOrders) {
                const clientId = order.purchase?.client?.id;
                if (!clientId)
                    continue;
                const timeDiff = order.maintenanceStartDate.getTime() - now.getTime();
                const minutesUntilOrder = Math.floor(timeDiff / (60 * 1000));
                if (minutesUntilOrder >= 58 && minutesUntilOrder <= 62) {
                    const result = await this.sendOrderNotification(order, clientId, order_notification_dto_1.NotificationTimeThreshold.ONE_HOUR, `Your order #${order.id} is scheduled in 1 hour. Please get ready.`);
                    notificationResults.push(result);
                }
                if (minutesUntilOrder >= 8 && minutesUntilOrder <= 12) {
                    const result = await this.sendOrderNotification(order, clientId, order_notification_dto_1.NotificationTimeThreshold.TEN_MINUTES, `Your order #${order.id} is coming up in 10 minutes! Our technician will arrive shortly.`);
                    notificationResults.push(result);
                }
            }
            return {
                data: notificationResults,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            this.logger.error(`Error while sending upcoming order notifications: ${error.message}`, error.stack);
            return {
                data: null,
                ok: false,
                status: 500,
                error: 'Failed to send notifications',
            };
        }
    }
    async sendSpecificNotification(timeThreshold, orderId) {
        try {
            const order = await this.prisma.orderOperator.findUnique({
                where: { id: orderId },
                include: {
                    purchase: {
                        include: {
                            client: true,
                        },
                    },
                },
            });
            if (!order) {
                return {
                    data: null,
                    ok: false,
                    status: 404,
                    error: `Order #${orderId} not found`,
                };
            }
            const clientId = order.purchase?.client?.id;
            if (!clientId) {
                return {
                    data: null,
                    ok: false,
                    status: 400,
                    error: 'Client information not found for this order',
                };
            }
            let message = '';
            if (timeThreshold === order_notification_dto_1.NotificationTimeThreshold.ONE_HOUR) {
                message = `Your order #${order.id} is scheduled in 1 hour. Please get ready.`;
            }
            else if (timeThreshold === order_notification_dto_1.NotificationTimeThreshold.TEN_MINUTES) {
                message = `Your order #${order.id} is coming up in 10 minutes! Our technician will arrive shortly.`;
            }
            else {
                return {
                    data: null,
                    ok: false,
                    status: 400,
                    error: 'Invalid time threshold. Use "1-hour" or "10-minutes"',
                };
            }
            const result = await this.sendOrderNotification(order, clientId, timeThreshold, message);
            return {
                data: result,
                ok: true,
                status: 200,
                error: '',
            };
        }
        catch (error) {
            this.logger.error(`Error sending ${timeThreshold} notification for order #${orderId}: ${error.message}`, error.stack);
            return {
                data: null,
                ok: false,
                status: 500,
                error: `Failed to send ${timeThreshold} notification for order #${orderId}`,
            };
        }
    }
    async sendOrderNotification(order, clientId, timeWindow, message) {
        try {
            const notificationData = {
                title: `Upcoming Order Reminder`,
                body: message,
                isGlobal: false,
                recipientId: clientId,
            };
            const notification = await this.notificationService.createNotification(notificationData);
            this.logger.log(`Sent ${timeWindow} notification for order #${order.id} to client #${clientId}`);
            return {
                orderId: order.id,
                clientId: clientId,
                timeWindow: timeWindow,
                notificationId: notification.id,
                sent: true,
            };
        }
        catch (error) {
            this.logger.error(`Failed to send ${timeWindow} notification for order #${order.id}: ${error.message}`, error.stack);
            return {
                orderId: order.id,
                clientId: clientId,
                timeWindow: timeWindow,
                sent: false,
                error: error.message,
            };
        }
    }
};
exports.OrdersNotificationService = OrdersNotificationService;
exports.OrdersNotificationService = OrdersNotificationService = OrdersNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        notification_service_1.NotificationService])
], OrdersNotificationService);
//# sourceMappingURL=orders-notification.service.js.map