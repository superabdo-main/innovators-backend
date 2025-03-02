import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

interface ItemCombination {
  itemIds: number[];
  actualDuration: number;
  systemDuration: number;
}

@Injectable()
export class MaintenanceTimePredictionService {
  private readonly logger = new Logger(MaintenanceTimePredictionService.name);
  private readonly SIMILARITY_THRESHOLD = 0.8; // Similarity threshold for item combinations
  private readonly MIN_SAMPLES = 3; // Minimum samples needed for prediction
  private readonly DEFAULT_EFFICIENCY_FACTOR = 0.85; // Default factor when no data available

  constructor(private prisma: PrismaService) {}

  /**
   * Predicts maintenance time for a combination of items
   */
  async predictMaintenanceTime(itemIds: number[]): Promise<number> {
    try {
      // Sort item IDs for consistent comparison
      const sortedItemIds = [...itemIds].sort((a, b) => a - b);

      // Get system duration (sum of individual maintenance times)
      const systemDuration = await this.getSystemDuration(sortedItemIds);
      
      // Get historical data for similar combinations
      const similarCombinations = await this.findSimilarCombinations(sortedItemIds);

      if (similarCombinations.length < this.MIN_SAMPLES) {
        // Not enough data, use default efficiency factor
        return Math.round(systemDuration * this.DEFAULT_EFFICIENCY_FACTOR);
      }

      // Calculate average efficiency factor from similar combinations
      const efficiencyFactor = this.calculateEfficiencyFactor(similarCombinations);
      
      // Predict maintenance time
      const predictedTime = Math.round(systemDuration * efficiencyFactor);
      
      this.logger.debug(
        `Prediction for items [${sortedItemIds.join(',')}]: ` +
        `${predictedTime}min (system: ${systemDuration}min, factor: ${efficiencyFactor})`,
      );

      return predictedTime;
    } catch (error) {
      this.logger.error('Error predicting maintenance time:', error);
      // Fallback to system duration with default efficiency factor
      const systemDuration = await this.getSystemDuration(itemIds);
      return Math.round(systemDuration * this.DEFAULT_EFFICIENCY_FACTOR);
    }
  }

  /**
   * Adds a new training sample
   */
  async addTrainingSample(
    itemIds: number[],
    actualDuration: number,
    orderId?: number,
  ): Promise<void> {
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

      this.logger.debug(
        `Added training sample: items [${sortedItemIds.join(',')}], ` +
        `actual: ${actualDuration}min, system: ${systemDuration}min`,
      );
    } catch (error) {
      this.logger.error('Error adding training sample:', error);
      throw error;
    }
  }

  /**
   * Gets the system-calculated duration (sum of individual maintenance times)
   */
  private async getSystemDuration(itemIds: number[]): Promise<number> {
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

  /**
   * Finds similar item combinations from training data
   */
  private async findSimilarCombinations(itemIds: number[]): Promise<ItemCombination[]> {
    // Get all training samples
    const allSamples = await this.prisma.maintenanceTimeTraining.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1000, // Limit to recent samples
    });

    // Filter for similar combinations
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

  /**
   * Calculates similarity between two item combinations
   */
  private calculateSimilarity(items1: number[], items2: number[]): number {
    const set1 = new Set(items1);
    const set2 = new Set(items2);
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  /**
   * Calculates efficiency factor based on similar combinations
   */
  private calculateEfficiencyFactor(combinations: ItemCombination[]): number {
    const factors = combinations.map(
      combo => combo.actualDuration / combo.systemDuration,
    );
    
    // Calculate weighted average, giving more weight to combinations with more items
    const weights = combinations.map(combo => combo.itemIds.length);
    const weightedSum = factors.reduce(
      (sum, factor, i) => sum + factor * weights[i],
      0,
    );
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    return weightedSum / totalWeight;
  }
}
