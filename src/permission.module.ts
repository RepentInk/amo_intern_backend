import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
