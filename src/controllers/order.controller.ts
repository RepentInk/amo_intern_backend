import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Order } from 'src/interfaces/order.inteface';
import { OrderService } from 'src/services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): Order[] {
    try {
      return this.orderService.getAllOrders();
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  createOrder(@Body(new ValidationPipe()) createOrderDto: CreateOrderDto) {
    try {
      return this.orderService.createOrder(createOrderDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: CreateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: number) {
    return this.orderService.removeOrder(id);
  }
}
