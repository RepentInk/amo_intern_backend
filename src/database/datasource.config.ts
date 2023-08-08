import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import entities from './entities';
// import { Dbmigration1691160447041 } from 'src/migrations/1691160447041-dbmigration';
import { DummyData1690859241130 } from 'src/migrations/1690859241130-dummyData';

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
  migrations: ['src/migrations/**/*{.ts,.js}']
});


