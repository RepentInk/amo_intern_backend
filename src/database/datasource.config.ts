import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import entities from './entities';

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


