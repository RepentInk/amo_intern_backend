import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { Customer } from '../entities/customer.entity';
import { Categories } from '../entities/category.entity';
import { Items } from '../entities/items.entity';
import { Order } from '../entities/order.entity';
import { Users } from '../entities/users.entity';
import { OrderItems } from '../entities/orderItems.entity';
import { UserLog } from '../entities/userLog.entities';

const entities = [
  Categories,
  Customer,
  Items,
  Order,
  OrderItems,
  Permission,
  Users,
  Role,
  UserLog,
];

export default entities;
