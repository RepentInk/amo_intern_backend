import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderItemService } from '../services/orderItems.service';
import { BasicController } from 'src/interfaces/controller.interface';
import { OrderItemsDto } from 'src/dto/orderItems.dto';

@Controller('orderItems')
export class OrderItemController implements BasicController {

  constructor(private readonly orderItemService: OrderItemService) { }

  @Get()
  findAll(): Promise<OrderItemsDto[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.findOne(id);
  }

  @Post()
  create(@Body() orderItemsDto: OrderItemsDto): Promise<OrderItemsDto> {
    return this.orderItemService.create(orderItemsDto);
  }

  @Put(':id')
  update(@Body() orderItemsDto: OrderItemsDto, @Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.update(orderItemsDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.delete(id);
  }

}
