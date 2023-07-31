import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoryService } from 'src/services/categories.service';
import { Category } from 'src/interfaces/categories.interface';

@Controller('categories')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) { }

  //create a category
  @Post()
  create(@Body() category: Category): Promise<{ message: string; category: Category }> {
    return this.CategoryService.create(category);
  }

  // Get all categories
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.CategoryService.getAllCategories();
  }

  //Get one category by the id
  @Get(':id')
  async getOneCategory(@Param('id') id: number): Promise<Category> {
    return this.CategoryService.getOneCategory(id);
  }

  //Update a category by the id
  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() category: Category): Promise<{ message: string, category: Category }> {
    return this.CategoryService.updateCategory(id, category);
  }

  //Delete a category by the id
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<{ message: string }> {
    return this.CategoryService.deleteCategory(id);
  }

}
