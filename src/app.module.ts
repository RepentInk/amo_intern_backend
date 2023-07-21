import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserLogService } from './services/userLog.service';

@Module({
  imports: [UserLogService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
