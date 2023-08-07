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
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrderController implements BasicController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all orders.',
    type: OrderDto,
    isArray: true,
  })
  async findAll(): Promise<OrderDto[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved the order.',
    type: OrderDto,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async findOne(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: OrderDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() orderDto: OrderDto): Promise<OrderDto> {
    return this.orderService.create(orderDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Order updated successfully.',
    type: OrderDto,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Body() orderDto: OrderDto,
    @Param('id') id: number,
  ): Promise<OrderDto> {
    return this.orderService.update(orderDto, id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Order deleted successfully.',
    type: OrderDto,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async delete(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.delete(id);
  }

  @Get('chart_data')
  @ApiOkResponse({
    description: 'Successfully retrieved chart data for orders.',
    type: Object, // Replace "Object" with the actual type of the chart data
  })
  async orderData(): Promise<any> {
    return this.orderService.OrderData();
  }
}
