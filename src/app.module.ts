import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserLogService } from './services/userLog.service';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.services';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';;
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
import { RolePermissionsController } from './controllers/rolepermissions.controller';
import { RolePermissionsService } from './services/rolepermissions.service';

// Ayariga





// Swanzy




// Adams








@Module({
  imports: [],
  controllers: [
    AppController,
    ItemsController,
    CategoryController,
    CustomerController,
    OrderController,
    OrderItemController,
    PermissionController,
    UsersController,
    RolePermissionsController,

    // Agariga





    // Swanzy




    // Adams 





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
    RolePermissionsService,

    // Agariga





    // Swanzy




    // Adams 



    
  ],
})
export class AppModule {}
