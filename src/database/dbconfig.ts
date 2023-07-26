import { ConfigModule } from '@nestjs/config/dist';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
// import entities from 'src/entities';
ConfigModule.forRoot();
export const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  // entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  migrations:[]
}