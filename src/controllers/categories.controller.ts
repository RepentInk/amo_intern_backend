import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../services/categories.service';
import { CategoryDto } from 'src/dto/category.dto';
import { Category } from 'src/interfaces/categories.interface';
import { BasicController } from 'src/interfaces/controller.interface';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Categories } from 'src/entities/category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController implements BasicController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all categories.',
    type: Categories,
    isArray: true,
  })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved the category.',
    type: Categories,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Category created successfully.',
    type: Categories,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(categoryDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Category updated successfully.',
    type: Categories,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async update(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, categoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Category deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoryService.delete(id);
  }
}
