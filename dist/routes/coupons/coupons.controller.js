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
exports.CouponsController = void 0;
const common_1 = require("@nestjs/common");
const coupons_service_1 = require("./coupons.service");
const coupon_dto_1 = require("./dto/coupon.dto");
let CouponsController = class CouponsController {
    constructor(couponsService) {
        this.couponsService = couponsService;
    }
    async createCoupon(createCouponDto) {
        return this.couponsService.createCoupon(createCouponDto);
    }
    async getAllCoupons() {
        return this.couponsService.getAllCoupons();
    }
    async getCouponByCode(code) {
        return this.couponsService.getCouponByCode(code);
    }
    async updateCoupon(code, updateCouponDto) {
        return this.couponsService.updateCoupon(code, updateCouponDto);
    }
    async deleteCoupon(code) {
        return this.couponsService.deleteCoupon(code);
    }
    async validateCoupon(validateCouponDto) {
        return this.couponsService.validateCoupon(validateCouponDto);
    }
};
exports.CouponsController = CouponsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "getAllCoupons", null);
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "getCouponByCode", null);
__decorate([
    (0, common_1.Put)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, coupon_dto_1.UpdateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "updateCoupon", null);
__decorate([
    (0, common_1.Delete)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "deleteCoupon", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.ValidateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponsController.prototype, "validateCoupon", null);
exports.CouponsController = CouponsController = __decorate([
    (0, common_1.Controller)('coupons'),
    __metadata("design:paramtypes", [coupons_service_1.CouponsService])
], CouponsController);
//# sourceMappingURL=coupons.controller.js.map