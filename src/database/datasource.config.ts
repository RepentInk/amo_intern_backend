import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import entities from './entities';
//specify import so tables are created before inserting dummy data
import { Dbmigration1692676799105 } from '../migrations/1692676799105-dbmigration';
import { DummyData1692676799106 } from '../migrations/1692676799106-dummyData';

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
  migrations: [Dbmigration1692676799105, DummyData1692676799106],
});
