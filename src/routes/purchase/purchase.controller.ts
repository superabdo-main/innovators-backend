import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, UseGuards, Headers } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ClientJwtGuard } from 'src/routes/auth/guards/client-jwt.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @HttpCode(201)
  // @UseGuards(ClientJwtGuard)
  create(@Body() createPurchaseDto: CreatePurchaseDto, @Headers('authorization') auth: string) {
    const token = auth.replace('Bearer ', '');
    return this.purchaseService.create(token, createPurchaseDto);
  }

  // @Get(':id')
  // getActiveOrders(@Param('id') id: string) {
  //   return this.purchaseService.getActiveOrders(id);
  // }

  // @Get("old/:id")
  // getOldOrders(@Param('id') id: string) {
  //   return this.purchaseService.getOldOrders(id);
  // }

  // @Get("fany/all")
  // getAllOrders() {
  //   return this.purchaseService.getAllOrders();
  // }

  // @Put('/finish/:id')
  // finishOrder(@Param('id') id: string) {
  //   return this.purchaseService.finishOrder(id);
  // }

  // @Get("closest-order/:id")
  // getClosestOrder(@Param('id') id: string) {
  //   return this.purchaseService.getClosestOrder(id);
  // }

  // @Put('/cancel/:id')
  // cancelOrder(@Param('id') id: string) {
  //   return this.purchaseService.cancel(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.purchaseService.remove(+id);
  // }
}
