import { FixerUser } from '@prisma/client';
export interface FixerScoreDto {
    fixer: FixerUser;
    score: number;
}
export interface FixerAvailabilityResponseDto {
    availableFixers: FixerScoreDto[];
    suggestedFixer?: FixerScoreDto;
    nextAvailableTime?: Date | null;
}
export interface WorkShiftTime {
    start: string;
    end: string;
}
export interface FixerWithRelations extends FixerUser {
    workShift: {
        start: string;
        end: string;
    };
    orders: {
        startTime: Date;
        endTime: Date;
        maintenanceDuration?: number;
    }[];
    stats?: {
        monthsOfExperience: number;
        averageRating: number;
        completedJobs: number;
    };
}
