import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { OrderItemService } from '../services/orderItems.service';
import { MockOrderItem } from '../mockup';

@Controller('orderItems')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @Post()
  createOrderItems(
    @Param('order_id') order_id: number,
    @Body() orderItemsData,
  ): any {
    const createdOrderItems = this.orderItemService.createOrderItems(
      order_id,
      orderItemsData,
    );

    return {
      message: 'Order items successfully added!',
      orderItems: createdOrderItems,
    };
  }

  @Get()
  getAllOrderItems(): { message: string; orderItems: MockOrderItem[] } {
    const orderItems = this.orderItemService.getItemsInAllOrders();
    return { message: 'Order items retrieved successfully', orderItems };
  }

  @Get(':order_item_id')
  getOrderItemById(@Param('id') id: number): any {
    const orderItem = this.orderItemService.getItemsInOneOrder(id);

    if (orderItem) {
      return {
        message: 'Order item found!',
        orderItem,
      };
    } else {
      return {
        message: 'Order item not found.',
      };
    }
  }

  @Patch(':order_id')
  editOrderItems(
    @Param('order_id') order_id: number,
    @Body() orderItemsData,
  ): any {
    const updatedOrderItems = this.orderItemService.editOrderItems(
      order_id,
      orderItemsData,
    );

    return {
      message: 'Order items successfully updated!',
      orderItems: updatedOrderItems,
    };
  }

  @Delete(':order_id')
  deleteOrderItemsByOrderId(@Param('order_id') order_id: number): any {
    const deletedOrderItems =
      this.orderItemService.deleteItemsInAnOrder(order_id);

    if (deletedOrderItems.length === 0) {
      return {
        message: 'No order items found for the given order ID.',
      };
    } else {
      return {
        message: 'Order items successfully deleted.',
        deletedOrderItems,
      };
    }
  }
}
