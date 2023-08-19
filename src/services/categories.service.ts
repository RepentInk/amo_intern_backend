import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryInterface } from 'src/interfaces/categories.interface';
import { CategoryDto } from 'src/dto/category.dto';
import { Categories } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHandlerService } from './responseHandler.service';
const successMessage = 'Successful';

@Injectable()
export class CategoryService implements CategoryInterface {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    try {
      const categories: any = await this.categoryRepository.find({
        where: { deleted_at: null },
      });
      return this.responseHandlerService.successResponse(
        successMessage,
        categories,
      );
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while fetching users');
    }
  }

  async findOne(id: number): Promise<CategoryDto> {
    try {
      const category: any = await this.categoryRepository.findOne({
        where: { id },
      });
      if (category.deleted_at !== null) {
        throw new NotFoundException('Category not found');
      }
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return this.responseHandlerService.successResponse(
        successMessage,
        category,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async create(categoryDto: CategoryDto): Promise<CategoryDto> {
    try {
      const category: any = this.categoryRepository.create(categoryDto);
      const createdCategory = await this.categoryRepository.save(category);
      return this.responseHandlerService.successResponse(
        successMessage,
        createdCategory,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async update(categoryDto: CategoryDto, id: number): Promise<CategoryDto> {
    try {
      const category: any = await this.categoryRepository.findOne({
        where: { id },
      });
      if (category.deleted_at !== null) {
        throw new NotFoundException('Category not found');
      }
      if (!category) {
        throw new NotFoundException('category not found');
      }
      this.categoryRepository.merge(category, categoryDto);

      const updatedCategory = await this.categoryRepository.save(category);
      return this.responseHandlerService.successResponse(
        successMessage,
        updatedCategory,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async delete(id: number): Promise<CategoryDto> {
    try {
      const category: any = await this.categoryRepository.findOne({
        where: { id },
      });
      if (category.deleted_at !== null) {
        throw new NotFoundException('Category not found');
      }
      // Update the deleted_at timestamp
      category.deleted_at = new Date();
      const updatedCategory = await this.categoryRepository.save(category);

      return this.responseHandlerService.successResponse(
        successMessage,
        updatedCategory,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }
}
