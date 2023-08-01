import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ItemsService } from 'src/services/items.services';
import { Items } from 'src/interfaces/items.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  //create an item
  @Post()
  async create(@Body() items: Items): Promise<{ message: string; items: Items }> {
    return this.ItemsService.create(items);
  }

  //Find all items
  @Get()
  async getAllItems(): Promise<Items[]> {
    return this.ItemsService.getAllItems();
  }

  // Find a particular item by the id
  @Get(':id')
  async getOneItem(@Param('id') id: number): Promise<Items> {
    return this.ItemsService.getOneItem(id);
  }

  //Update an item using its id
  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() item: Items,
  ): Promise<{ message: string; item: Items }> {
    return this.ItemsService.updateItem(id, item);
  }

  // Delete an item by the id
  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<{ message: string }> {
    return this.ItemsService.deleteItem(id);
  }
}
