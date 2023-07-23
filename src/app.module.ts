import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserLogService } from './services/userLog.service';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.services';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';
import { RolePermissionsModule } from './rolepermissions.module';
import { UsersModule } from './users.module';
import { PermissionModule } from './permission.module';
import { CustomerModule } from './customer.module';
import { OrderModule } from './order.module';
import { OrderItemModule } from './orderItems.module';

@Module({
  imports: [
    UsersModule,
    PermissionModule,
    RolePermissionsModule,
    CustomerModule,
    OrderModule,
    OrderItemModule
  ],
  controllers: [
    AppController,
    ItemsController,
    CategoryController
  ],
  providers: [
    AppService,
    UserLogService,
    ItemsService,
    CategoryService
  ]
})

export class AppModule { }
