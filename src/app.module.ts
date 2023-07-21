import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UserLogService } from './services/userLog.service';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.services';

@Module({
  imports: [],
  controllers: [AppController, ItemsController],
  providers: [AppService, UserLogService, ItemsService],
})


export class AppModule {}
