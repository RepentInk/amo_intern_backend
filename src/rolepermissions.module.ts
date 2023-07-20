import { Module } from '@nestjs/common';
import { RolePermissionsController } from './controllers/rolepermissions.controller';
import { RolePermissionsService } from './services/rolepermissions.service';

@Module({
  imports: [],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
})
export class RolePermissionsModule {}
