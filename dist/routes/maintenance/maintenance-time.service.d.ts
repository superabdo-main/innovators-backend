import { PrismaService } from 'nestjs-prisma';
export declare class MaintenanceTimePredictionService {
    private prisma;
    private readonly logger;
    private readonly SIMILARITY_THRESHOLD;
    private readonly MIN_SAMPLES;
    private readonly DEFAULT_EFFICIENCY_FACTOR;
    constructor(prisma: PrismaService);
    predictMaintenanceTime(itemIds: number[]): Promise<number>;
    addTrainingSample(itemIds: number[], actualDuration: number, orderId?: number): Promise<void>;
    private getSystemDuration;
    private findSimilarCombinations;
    private calculateSimilarity;
    private calculateEfficiencyFactor;
}
