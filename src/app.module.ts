import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserLogService } from './services/userLog.service';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.services';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';
import { CustomerModule } from './customer.module';
import { OrderModule } from './order.module';
import { OrderItemModule } from './orderItems.module';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { RolePermissionsController } from './controllers/rolepermissions.controller';
import { RolePermissionsService } from './services/rolepermissions.service';

@Module({
  imports: [CustomerModule, OrderModule, OrderItemModule],
  controllers: [
    AppController,
    ItemsController,
    CategoryController,
    PermissionController,
    UsersController,
    RolePermissionsController,
  ],
  providers: [
    AppService,
    UserLogService,
    ItemsService,
    CategoryService,
    PermissionService,
    UsersService,
    RolePermissionsService,
  ],
})
export class AppModule {}
