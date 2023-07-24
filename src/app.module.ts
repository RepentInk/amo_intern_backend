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
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/orderItems.service';
import { OrderItemController } from './controllers/orderItems.controller';

@Module({
  imports: [UsersModule, PermissionModule, RolePermissionsModule],
  controllers: [
    AppController,
    ItemsController,
    CategoryController,
    CustomerController,
    OrderController,
    OrderItemController,
  ],
  providers: [
    AppService,
    UserLogService,
    ItemsService,
    CategoryService,
    CustomerService,
    OrderService,
    OrderItemService,
  ],
})
export class AppModule {}
