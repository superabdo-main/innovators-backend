import { PrismaService } from 'nestjs-prisma';
import { FixerAvailabilityResponseDto } from './dto/fixer-assignment.dto';
export declare class FixerAssignmentService {
    private prisma;
    private readonly logger;
    private readonly MINIMUM_BREAK_MINUTES;
    private readonly MAX_LOOKUP_HOURS;
    private readonly TIME_INCREMENT_MINUTES;
    constructor(prisma: PrismaService);
    private parseTimeString;
    private formatTimeString;
    private isTimeInRange;
    private isFixerAvailable;
    findAvailableFixers(serviceIds: number[], workDateTime: Date, estimatedDuration: number): Promise<FixerAvailabilityResponseDto>;
    private findNextAvailableTime;
    private calculateFixerScore;
    assignFixerToOrder(orderId: number, fixerId: number, startTime: Date, estimatedDuration: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
