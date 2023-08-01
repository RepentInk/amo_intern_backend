import { BasicController } from 'src/interfaces/controller.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { ItemsDto } from 'src/dto/items.dto';
import { Items } from 'src/interfaces/items.interface';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
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
  async findAll(): Promise<Items[]> {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved the item.',
    type: ItemsDto,
  })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async findOne(@Param('id') id: number): Promise<Items> {
    return this.itemsService.getOneItem(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Item created successfully.',
    type: ItemsDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() itemsDto: ItemsDto): Promise<Items> {
    return this.itemsService.create(itemsDto);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Item updated successfully.', type: ItemsDto })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async update(
    @Body() itemsDto: ItemsDto,
    @Param('id') id: number,
  ): Promise<ItemsDto> {
    return this.itemsService.update(id, itemsDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Item deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
