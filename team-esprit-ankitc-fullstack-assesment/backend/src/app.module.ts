import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { UserModule } from './auth/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomError } from './utils/response';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { ShippingAddress } from './auth/entities/address.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(configService: ConfigService) =>({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Product, Order, ShippingAddress],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    
    UserModule,
    
    ProductsModule,
    
    OrdersModule
  ], 
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomError,
    },
  ],
})
export class AppModule {}
