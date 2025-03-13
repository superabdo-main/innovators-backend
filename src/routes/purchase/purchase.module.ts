import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { OrdersService } from 'src/routes/orders/orders.service';
import { FixerService } from 'src/routes/fixer/fixer.service';
import { TokenJwtModule } from 'src/modules/token-jwt/token-jwt.module';
import { MaintenanceTimePredictionService } from '../maintenance/maintenance-time.service';
import { FixerAssignmentService } from '../fixer/fixer-assignment.service';

@Module({
  imports: [TokenJwtModule],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    FixerAssignmentService,
    OrdersService,
    MaintenanceTimePredictionService,
    FixerService,
  ],
})
export class PurchaseModule {}
