import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { Permission } from 'src/entities/permission.entity';
import { RolePermission } from 'src/entities/rolepermssion.entity';

ConfigModule.forRoot();

export default new DataSource({
  type: 'mysql',
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Role, Permission, RolePermission],
  synchronize: false,
  migrations: [],
});