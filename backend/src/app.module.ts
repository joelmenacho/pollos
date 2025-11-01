// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        // Por defecto: sin SSL. Actívalo sólo si DB_SSL === 'true'
        const sslEnv = String(process.env.DB_SSL ?? '').toLowerCase();
        const wantSSL = sslEnv === 'true';
        const sslOption: boolean | { rejectUnauthorized: false } =
          wantSSL ? { rejectUnauthorized: false } : false;

        return {
          type: 'postgres' as const,
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT || 5432),
          username: process.env.DB_USERNAME || process.env.DB_USER || 'postgres',
          password: (process.env.DB_PASSWORD || process.env.DB_PASS || 'postgres') + '',
          database: process.env.DB_NAME || 'polleria',
          entities: [User, Product, Order, OrderItem],
          synchronize: process.env.NODE_ENV !== 'production',
          ssl: sslOption,               // <- clave para evitar "server does not support SSL"
          extra: { ssl: sslOption },    // <- algunos drivers miran también aquí
          // autoLoadEntities: true,     // opcional
        };
      },
    }),

    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
