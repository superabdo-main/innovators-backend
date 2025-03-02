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
exports.FixerController = void 0;
const common_1 = require("@nestjs/common");
const fixer_service_1 = require("./fixer.service");
const fixer_assignment_service_1 = require("./fixer-assignment.service");
let FixerController = class FixerController {
    constructor(fixerService, fixerAssignmentService) {
        this.fixerService = fixerService;
        this.fixerAssignmentService = fixerAssignmentService;
    }
    fetchFixerData(id) {
        return this.fixerService.fetchFixerData(id);
    }
    async findFixers(serviceIds, workDateTime, estimatedDuration) {
        const parsedServiceIds = serviceIds.split(',').map(id => parseInt(id));
        const parsedDateTime = new Date(workDateTime);
        return this.fixerAssignmentService.findAvailableFixers(parsedServiceIds, parsedDateTime, estimatedDuration);
    }
    async assignFixerToOrder(assignmentData) {
        const { orderId, fixerId, startTime, estimatedDuration } = assignmentData;
        const parsedStartTime = new Date(startTime);
        return this.fixerAssignmentService.assignFixerToOrder(orderId, fixerId, parsedStartTime, estimatedDuration);
    }
};
exports.FixerController = FixerController;
__decorate([
    (0, common_1.Get)('fetch-data/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FixerController.prototype, "fetchFixerData", null);
__decorate([
    (0, common_1.Get)('available'),
    __param(0, (0, common_1.Query)('serviceIds')),
    __param(1, (0, common_1.Query)('workDateTime')),
    __param(2, (0, common_1.Query)('estimatedDuration', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], FixerController.prototype, "findFixers", null);
__decorate([
    (0, common_1.Post)('assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FixerController.prototype, "assignFixerToOrder", null);
exports.FixerController = FixerController = __decorate([
    (0, common_1.Controller)('fixer'),
    __metadata("design:paramtypes", [fixer_service_1.FixerService,
        fixer_assignment_service_1.FixerAssignmentService])
], FixerController);
//# sourceMappingURL=fixer.controller.js.map