import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserLogService } from './services/userLog.service';
import { UserLogController } from './controllers/userLog.controller';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/orderItems.service';
import { OrderItemController } from './controllers/orderItems.controller';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './database/dbconfig';
import { SmsService } from './services/sms.service';
import entities from './database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [
    AppController,
    UserLogController,
    ItemsController,
    CategoryController,
    CustomerController,
    OrderController,
    OrderItemController,
    UsersController,
    PermissionController,
  ],
  providers: [
    AppService,
    UserLogService,
    ItemsService,
    CategoryService,
    CustomerService,
    OrderService,
    OrderItemService,
    PermissionService,
    UsersService,
    SmsService,
  ],
})
export class AppModule {}
