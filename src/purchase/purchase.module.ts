import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { OrdersService } from 'src/orders/orders.service';
import { FixerService } from 'src/fixer/fixer.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, OrdersService, FixerService],
})
export class PurchaseModule {}
