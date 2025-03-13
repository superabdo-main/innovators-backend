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
exports.PlaystationController = void 0;
const common_1 = require("@nestjs/common");
const playstation_service_1 = require("./playstation.service");
const create_playstation_dto_1 = require("./dto/create-playstation.dto");
const update_playstation_dto_1 = require("./dto/update-playstation.dto");
let PlaystationController = class PlaystationController {
    constructor(playstationService) {
        this.playstationService = playstationService;
    }
    create(createPlaystationDto) {
        return this.playstationService.create(createPlaystationDto);
    }
    async getFastatServiceOptions() {
        return await this.playstationService.getFastatServiceOptions();
    }
    findOne(id) {
        return this.playstationService.findOne(+id);
    }
    update(id, updatePlaystationDto) {
        return this.playstationService.update(+id, updatePlaystationDto);
    }
    remove(id) {
        return this.playstationService.remove(+id);
    }
};
exports.PlaystationController = PlaystationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_playstation_dto_1.CreatePlaystationDto]),
    __metadata("design:returntype", void 0)
], PlaystationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/fastat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlaystationController.prototype, "getFastatServiceOptions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaystationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_playstation_dto_1.UpdatePlaystationDto]),
    __metadata("design:returntype", void 0)
], PlaystationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaystationController.prototype, "remove", null);
exports.PlaystationController = PlaystationController = __decorate([
    (0, common_1.Controller)('services/playstation'),
    __metadata("design:paramtypes", [playstation_service_1.PlaystationService])
], PlaystationController);
//# sourceMappingURL=playstation.controller.js.map