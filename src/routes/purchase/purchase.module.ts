import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { OrdersService } from 'src/routes/orders/orders.service';
import { FixerService } from 'src/routes/fixer/fixer.service';
import { TokenJwtService } from 'src/modules/token-jwt/token-jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    JwtService,
    OrdersService,
    TokenJwtService,
    FixerService,
  ],
})
export class PurchaseModule {}
