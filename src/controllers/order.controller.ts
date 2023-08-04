import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderDto } from 'src/dto/order.dto';
import { BasicController } from 'src/interfaces/controller.interface';
import { OrderService } from 'src/services/order.service';

@Controller('orders')
export class OrderController implements BasicController {
  
  constructor(private readonly orderService: OrderService) { }

  @Get()
  findAll(): Promise<OrderDto[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  create(@Body() orderDto: OrderDto): Promise<OrderDto> {
    return this.orderService.create(orderDto);
  }

  @Put(':id')
  update(@Body() orderDto: OrderDto, @Param('id') id: number): Promise<OrderDto> {
    return this.orderService.update(orderDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.delete(id);
  }

  @Get('chart_data')
  orderData(): Promise<any> {
    return this.orderService.OrderData()
  }

}
