// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { Order } from '../entities/order.entity';          // 👈
import { OrderItem } from '../entities/order-item.entity'; // 👈
import { Product } from '../entities/product.entity';      // 👈
import { User } from '../entities/user.entity';            // 👈

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, User])],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
