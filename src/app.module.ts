import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PermissionModule } from './permission.module';

@Module({
  imports: [PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
