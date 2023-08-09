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
  ApiParam,
} from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrderController implements BasicController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all orders.',
    type: OrderDto,
    isArray: false,
  })
  async findAll(): Promise<OrderDto[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the order being retrieved',
    type: Number,
    required: true,
    example: 5
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the order.',
    type: OrderDto,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async findOne(@Param('id') id: number): Promise<OrderDto> {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiParam({
    name:'unique_number',
    description: 'the unique number of the order being created',
    type: String,
    required: true,
    example: 'ASD345' 
  })
  @ApiParam({
    name: 'order_code',
    description: 'The code of the order being made',
    type: String,
    required: true,
    example: 'OD004'
  })
  @ApiParam({
    name: 'delivery_point',
    description: 'The point the order should be delivered to',
    type: String,
    required: true,
    example: 'Ayeduase gate'
  })
  @ApiParam({
    name: 'payment',
    description: 'Whether the order is paid in full or half',
    type: String,
    required: true,
    example: 'Half-payment'
  })
  @ApiParam({
    name: 'status',
    description: 'The status of the order',
    type: String,
    required: true,
    example: 'Pending'
  })
  @ApiParam({
    name: 'amount_paid',
    description: 'The amount the customer has paid',
    type: Number,
    required: true,
    example: 450
  })
  @ApiParam({
    name: 'payment_mode',
    description: 'The mode of the payment the customer made',
    type: String,
    required: true,
    example: 'Mobile money'
  })
  @ApiParam({
    name: 'order_channel',
    description: 'The channel through which the order was made',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: OrderDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() orderDto: OrderDto): Promise<OrderDto> {
    return this.orderService.create(orderDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the order being updated',
    type: Number,
    required: true,
    example: 5
  })
  @ApiParam({
    name:'unique_number',
    description: 'The unique number of the order being updated',
    type: String,
    required: false,
    example: 'ASD345' 
  })
  @ApiParam({
    name: 'order_code',
    description: 'The code of the order being made',
    type: String,
    required: false,
    example: 'OD007'
  })
  @ApiParam({
    name: 'delivery_point',
    description: 'The point the order should be delivered to',
    type: String,
    required: false,
    example: 'KNUST main entrance'
  })
  @ApiParam({
    name: 'payment',
    description: 'Whether the order is paid in full or half',
    type: String,
    required: false,
    example: 'full-payment'
  })
  @ApiParam({
    name: 'status',
    description: 'The status of the order',
    type: String,
    required: false,
    example: 'delivered'
  })
  @ApiParam({
    name: 'amount_paid',
    description: 'The amount the customer has paid',
    type: Number,
    required: false,
    example: 650
  })
  @ApiParam({
    name: 'payment_mode',
    description: 'The mode of the payment the customer made',
    type: String,
    required: false,
    example: 'Cash'
  })
  @ApiParam({
    name: 'order_channel',
    description: 'The channel through which the order was made',
    type: String,
    required: false,
  })
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
  @ApiParam({
    name: 'id',
    description: 'id of the order being deleted',
    type: Number,
    required: true,
    example: 3
  })
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
