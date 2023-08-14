import { Module } from '@nestjs/common';
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
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './database/dbconfig';
import { SmsService } from './services/sms.service';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { ResponseHandlerService } from './services/responseHandler.service';

import entities from './database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRETE,
      signOptions: { expiresIn: process.env.TOKEN_DURATION },
    }),
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature(entities)
  ],
  controllers: [
    AuthController,
    UserLogController,
    ItemsController,
    CategoryController,
    CustomerController,
    OrderController,
    OrderItemController,
    UsersController,
    PermissionController,
    RoleController,
    ProfileController
  ],
  providers: [
    UserLogService,
    ItemsService,
    CategoryService,
    CustomerService,
    OrderService,
    OrderItemService,
    PermissionService,
    RoleService,
    UsersService,
    AuthService,
    SmsService,
    ProfileService,
    ResponseHandlerService
  ],
})
export class AppModule {}
