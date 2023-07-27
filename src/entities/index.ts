import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { RolePermission } from './rolepermssion.entity';
import { Customer } from './customer.entity';
import { Category } from './category.entity';
import { Items } from './items.entiy';
import { Order } from './order.entity';
import { Users } from './users.entity';
import { OrderItems } from './orderItems.entity';
import { UserLog } from './userLog.entities';

const entities = [
  //swanzy
  Customer,
  Category,
  Items,

  //Ayariga
  Order,
  Users,
  OrderItems,
  UserLog,

  //Adams
  Role,
  Permission,
  RolePermission

    ]

export default entities;
