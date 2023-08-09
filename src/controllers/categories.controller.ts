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
import { BasicController } from 'src/interfaces/controller.interface';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
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
  async findAll(): Promise<CategoryDto[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'id of the category you want to retrieve',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the category.',
    type: Categories,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async findOne(@Param('id') id: number): Promise<CategoryDto> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiParam({
    name: 'name',
    required: true,
    type: String,
    description: 'name of the category u want to create',
    example: 'electronics',
  })
  @ApiCreatedResponse({
    description: 'Category created successfully.',
    type: Categories,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CategoryDto,
    description: 'Category data to be created',
    required: true,
  })
  async create(@Body() categoryDto: CategoryDto): Promise<CategoryDto> {
    return this.categoryService.create(categoryDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'id of the category u want to update',
    example: 1,
  })
  @ApiParam({
    name: 'name',
    required: true,
    type: String,
    description: 'new name of the category u want to update',
    example: 'devices',
  })
  @ApiOkResponse({
    description: 'Category updated successfully.',
    type: Categories,
  })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CategoryDto,
    description: 'Category data to be updated',
    required: true,
  })
  async update(
    @Body() categoryDto: CategoryDto,
    @Param('id') id: number,
  ): Promise<CategoryDto> {
    return this.categoryService.update(categoryDto, id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'id of the category u want to delete',
    example: 1,
  })
  @ApiOkResponse({ description: 'Category deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async delete(@Param('id') id: number): Promise<CategoryDto> {
    return this.categoryService.delete(id);
  }
}
