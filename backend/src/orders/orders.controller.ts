import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; import { OrdersService } from './orders.service'; import { CreateOrderDto } from './dto/create-order.dto';
@UseGuards(AuthGuard('jwt')) @Controller('orders') export class OrdersController {
  constructor(private readonly svc: OrdersService) {}
  @Post() create(@Req() req:any, @Body() dto: CreateOrderDto){ return this.svc.create(req.user.sub, dto.items); }
  @Get('my') my(@Req() req:any){ return this.svc.my(req.user.sub); }
}
