import { Module } from '@nestjs/common';
import { MaintenanceTimePredictionService } from './maintenance-time.service';

@Module({
  providers: [MaintenanceTimePredictionService],
  exports: [MaintenanceTimePredictionService],
})
export class MaintenanceModule {}
