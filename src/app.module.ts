import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { OrderItemModule } from './orderItems.module';

@Module({
  imports: [OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
