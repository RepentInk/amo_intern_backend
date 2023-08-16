import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import entities from './entities';
//specify import so tables are created before inserting dummy data
import { Dbmigration1692118040282 } from '../migrations/1692118040282-dbmigration';
import { DummyData1692118040283 } from '../migrations/1692118040283-dummyData';

ConfigModule.forRoot();
export default new DataSource({
  type: 'mysql',
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: entities,
  synchronize: false,
  migrations: [Dbmigration1692118040282, DummyData1692118040283],
});
