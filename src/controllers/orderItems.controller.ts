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
} from '@nestjs/swagger';

@Controller('orderItems')
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
  @ApiOkResponse({
    description: 'Successfully retrieved the order item.',
    type: OrderItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Order item not found' })
  async findOne(@Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Order item created successfully.',
    type: OrderItemsDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() orderItemsDto: OrderItemsDto): Promise<OrderItemsDto> {
    return this.orderItemService.create(orderItemsDto);
  }

  @Put(':id')
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
  @ApiOkResponse({
    description: 'Order item deleted successfully.',
    type: OrderItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Order item not found' })
  async delete(@Param('id') id: number): Promise<OrderItemsDto> {
    return this.orderItemService.delete(id);
  }
}
