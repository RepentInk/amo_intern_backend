import { Module } from '@nestjs/common';
import { OrderItemService } from './services/orderItems.service';
import { OrderItemController } from './controllers/orderItems.controller';

@Module({
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
