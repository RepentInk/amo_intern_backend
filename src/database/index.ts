import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RolePermission } from '../entities/rolepermssion.entity';
import { Customer } from '../entities/customer.entity';
import { Category } from '../entities/category.entity';
import { Items } from '../entities/items.entiy';
import { Order } from '../entities/order.entity';
import { Users } from '../entities/users.entity';
import { OrderItems } from '../entities/orderItems.entity';
import { UserLog } from '../entities/userLog.entities';

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