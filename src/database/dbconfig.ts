import { ConfigModule } from '@nestjs/config/dist';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Users } from 'src/entities/users.entity';
import { Order } from 'src/entities/order.entity';
import { Items } from 'src/entities/items.entiy';
import { Category } from 'src/entities/category.entity';
import { Customer } from 'src/entities/customer.entity';
import { OrderItems } from 'src/entities/orderItems.entity';
import { UserLog } from 'src/entities/userLog.entities';
ConfigModule.forRoot();

export const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Order, Items, Category, Customer, OrderItems, UserLog],
  synchronize: true,
  migrations: [],
};
