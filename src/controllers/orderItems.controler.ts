import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderItemService } from '../services/orderItems.service';
import { MockOrderItem } from '../mockup';

@Controller('orderItems')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  createOrderItem(@Body() orderItemData): {
    message: string;
    orderItem: MockOrderItem;
  } {
    const { order_id, item_id, quantity, price } = orderItemData;
    const orderItem = this.orderItemService.createOrderItem(
      order_id,
      item_id,
      quantity,
      price,
    );
    return { message: 'Order item created successfully', orderItem };
  }

  @Get()
  getAllOrderItems(): { message: string; orderItems: MockOrderItem[] } {
    const orderItems = this.orderItemService.getAllOrderItems();
    return { message: 'Order items retrieved successfully', orderItems };
  }

  @Get('order/:order_id')
  getOrderItemsByOrderId(@Param('order_id') order_id: number): {
    message: string;
    orderItems: MockOrderItem[];
  } {
    const orderItems = this.orderItemService.getOrderItemsByOrderId(order_id);
    return { message: `order ${order_id} retrieved successfully`, orderItems };
  }

  @Get('item/:item_id')
  getOrderItemsByItemId(@Param('item_id') item_id: number): {
    message: string;
    orderItems: MockOrderItem[];
  } {
    const orderItems = this.orderItemService.getOrderItemsByItemId(item_id);
    return { message: 'Order items retrieved successfully', orderItems };
  }
}
