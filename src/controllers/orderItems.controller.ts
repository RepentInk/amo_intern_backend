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
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('order_items')
@ApiTags('Order Items')
export class OrderItemController implements BasicController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all order items.',
    type: OrderItemsDto,
    isArray: true,
  })
  async findAll(): Promise<OrderItemsDto[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the orderItem you are retrieving',
    type: Number,
    required: true,
    example: 12
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the order item.',
    type: OrderItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Order item not found' })
  async findOne(@Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.findOne(id);
  }

  @Post()
  @ApiParam({
    name: 'item_id',
    description: 'id of the item ordered',
    type: Number,
    required: true,
    example: 4
  })
  @ApiParam({
    name: 'quantity',
    description: 'Quantity of the order made',
    type: Number,
    required: true,
    example: 3
  })
  @ApiParam({
    name: 'price',
    description: 'price of the item ordered',
    type: Number,
    required: true,
    example: 300
  })
  @ApiCreatedResponse({
    description: 'Order item created successfully.',
    type: OrderItemsDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() orderItemsDto: OrderItemsDto): Promise<OrderItemsDto> {
    return this.orderItemService.create(orderItemsDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the orderItem you are updating',
    type: Number,
    required: true,
    example: 12
  })
  @ApiParam({
    name: 'order_id',
    description: 'id of the order made',
    type: Number,
    required: false,
    example: 12
  })
  @ApiParam({
    name: 'item_id',
    description: 'id of the item ordered',
    type: Number,
    required: false,
    example: 4
  })
  @ApiParam({
    name: 'quantity',
    description: 'Quantity of the order made',
    type: Number,
    required: false,
    example: 3
  })
  @ApiParam({
    name: 'price',
    description: 'price of the item ordered',
    type: Number,
    required: false,
    example: 300
  })
  @ApiOkResponse({
    description: 'Order item updated successfully.',
    type: OrderItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Order item not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Body() orderItemsDto: OrderItemsDto,
    @Param('id') id: number,
  ): Promise<OrderItemsDto> {
    return this.orderItemService.update(orderItemsDto, id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the orderItem you are deleting',
    type: Number,
    required: true,
    example: 4
  })
  @ApiOkResponse({
    description: 'Order item deleted successfully.',
    type: OrderItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Order item not found' })
  async delete(@Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.delete(id);
  }
}
