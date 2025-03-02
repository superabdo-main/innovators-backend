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
var MaintenanceTimePredictionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceTimePredictionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let MaintenanceTimePredictionService = MaintenanceTimePredictionService_1 = class MaintenanceTimePredictionService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(MaintenanceTimePredictionService_1.name);
        this.SIMILARITY_THRESHOLD = 0.8;
        this.MIN_SAMPLES = 3;
        this.DEFAULT_EFFICIENCY_FACTOR = 0.85;
    }
    async predictMaintenanceTime(itemIds) {
        try {
            const sortedItemIds = [...itemIds].sort((a, b) => a - b);
            const systemDuration = await this.getSystemDuration(sortedItemIds);
            const similarCombinations = await this.findSimilarCombinations(sortedItemIds);
            if (similarCombinations.length < this.MIN_SAMPLES) {
                return Math.round(systemDuration * this.DEFAULT_EFFICIENCY_FACTOR);
            }
            const efficiencyFactor = this.calculateEfficiencyFactor(similarCombinations);
            const predictedTime = Math.round(systemDuration * efficiencyFactor);
            this.logger.debug(`Prediction for items [${sortedItemIds.join(',')}]: ` +
                `${predictedTime}min (system: ${systemDuration}min, factor: ${efficiencyFactor})`);
            return predictedTime;
        }
        catch (error) {
            this.logger.error('Error predicting maintenance time:', error);
            const systemDuration = await this.getSystemDuration(itemIds);
            return Math.round(systemDuration * this.DEFAULT_EFFICIENCY_FACTOR);
        }
    }
    async addTrainingSample(itemIds, actualDuration, orderId) {
        try {
            const sortedItemIds = [...itemIds].sort((a, b) => a - b);
            const systemDuration = await this.getSystemDuration(sortedItemIds);
            await this.prisma.maintenanceTimeTraining.create({
                data: {
                    itemIds: sortedItemIds,
                    actualDuration,
                    systemDuration,
                    orderId,
                },
            });
            this.logger.debug(`Added training sample: items [${sortedItemIds.join(',')}], ` +
                `actual: ${actualDuration}min, system: ${systemDuration}min`);
        }
        catch (error) {
            this.logger.error('Error adding training sample:', error);
            throw error;
        }
    }
    async getSystemDuration(itemIds) {
        const items = await this.prisma.playStationFastatItems.findMany({
            where: {
                id: {
                    in: itemIds,
                },
            },
            select: {
                maintenanceTime: true,
            },
        });
        return items.reduce((sum, item) => sum + (item.maintenanceTime || 0), 0);
    }
    async findSimilarCombinations(itemIds) {
        const allSamples = await this.prisma.maintenanceTimeTraining.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 1000,
        });
        return allSamples
            .map(sample => ({
            itemIds: sample.itemIds,
            actualDuration: sample.actualDuration,
            systemDuration: sample.systemDuration,
            similarity: this.calculateSimilarity(itemIds, sample.itemIds),
        }))
            .filter(sample => sample.similarity >= this.SIMILARITY_THRESHOLD)
            .map(({ itemIds, actualDuration, systemDuration }) => ({
            itemIds,
            actualDuration,
            systemDuration,
        }));
    }
    calculateSimilarity(items1, items2) {
        const set1 = new Set(items1);
        const set2 = new Set(items2);
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);
        return intersection.size / union.size;
    }
    calculateEfficiencyFactor(combinations) {
        const factors = combinations.map(combo => combo.actualDuration / combo.systemDuration);
        const weights = combinations.map(combo => combo.itemIds.length);
        const weightedSum = factors.reduce((sum, factor, i) => sum + factor * weights[i], 0);
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        return weightedSum / totalWeight;
    }
};
exports.MaintenanceTimePredictionService = MaintenanceTimePredictionService;
exports.MaintenanceTimePredictionService = MaintenanceTimePredictionService = MaintenanceTimePredictionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], MaintenanceTimePredictionService);
//# sourceMappingURL=maintenance-time.service.js.map