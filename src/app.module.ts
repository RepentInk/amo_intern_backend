import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { RolePermissionsModule } from './rolepermissions.module';

@Module({
  imports: [RolePermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
