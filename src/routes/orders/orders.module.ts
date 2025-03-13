import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { FixerService } from 'src/routes/fixer/fixer.service';
import { FixerAssignmentService } from '../fixer/fixer-assignment.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,FixerAssignmentService, FixerService],
})
export class OrdersModule {}
