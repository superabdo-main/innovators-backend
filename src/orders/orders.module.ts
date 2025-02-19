import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { FixerService } from 'src/fixer/fixer.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, FixerService],
})
export class OrdersModule {}
