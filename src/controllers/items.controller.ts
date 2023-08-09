import { BasicController } from 'src/interfaces/controller.interface';
import { ItemsService } from '../services/items.service';
import { ItemsDto } from 'src/dto/items.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Controller('items')
@ApiTags('Items')
export class ItemsController implements BasicController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all items.',
    type: ItemsDto,
    isArray: true,
  })
  async findAll(): Promise<ItemsDto[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'id of item to be retrieved',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the item.',
    type: ItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async findOne(@Param('id') id: number): Promise<ItemsDto> {
    return this.itemsService.findOne(id);
  }

  @Post()
  @ApiParam({
    name: 'name',
    description: 'name of item to be created',
    type: String,
    required: true,
    example: 'calculator',
  })
  @ApiParam({
    name: 'description',
    description: 'description of item to be created',
    type: String,
    required: false,
    example: 'digital scientific calculators',
  })
  @ApiParam({
    name: 'unit',
    description: 'unit of item to be created',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'price',
    description: 'price of item to be created',
    type: Number,
    required: true,
    example: 100,
  })
  @ApiParam({
    name: 'category_id',
    description: 'category_id of the category the item belongs to',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiCreatedResponse({
    description: 'Item created successfully.',
    type: ItemsDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: ItemsDto,
    description: 'Item data to be created',
    required: true,
  })
  async create(@Body() itemsDto: ItemsDto): Promise<ItemsDto> {
    return this.itemsService.create(itemsDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'id of item to be updated',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiParam({
    name: 'name',
    description: 'name of item to be updated',
    type: String,
    required: false,
    example: 'calculator',
  })
  @ApiParam({
    name: 'description',
    description: 'new description of item to be updated',
    type: String,
    required: false,
    example: 'digital scientific calculators',
  })
  @ApiParam({
    name: 'unit',
    description: 'new unit of item to be updated',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiParam({
    name: 'price',
    description: 'new price of item to be updated',
    type: Number,
    required: false,
    example: 100,
  })
  @ApiParam({
    name: 'category_id',
    description: 'new category_id of the category the item belongs to',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiOkResponse({ description: 'Item updated successfully.', type: ItemsDto })
  @ApiNotFoundResponse({ description: 'Item not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: ItemsDto,
    description: 'Item data to be updated',
    required: true,
  })
  async update(
    @Body() itemsDto: ItemsDto,
    @Param('id') id: number,
  ): Promise<ItemsDto> {
    return this.itemsService.update(itemsDto, id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id of item to be deleted',
    type: Number,
    required: true,
    example: 1,
  })
  @ApiOkResponse({ description: 'Item deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async delete(@Param('id') id: number): Promise<ItemsDto> {
    return this.itemsService.delete(id);
  }
}
