import { DataSource } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { UserLog } from 'src/entities/userLog.entities';
import { Order } from 'src/entities/order.entity';
import { Items } from 'src/entities/items.entity';
import { Categories } from 'src/entities/category.entity';
import { Customer } from 'src/entities/customer.entity';
import { OrderItems } from 'src/entities/orderItems.entity';
import entities from './entities';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities,
  synchronize: true,
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
