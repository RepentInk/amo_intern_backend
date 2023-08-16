import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryInterface } from 'src/interfaces/categories.interface';
import { CategoryDto } from 'src/dto/category.dto';
import { Categories } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService implements CategoryInterface {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    try {
      const categories: any = await this.categoryRepository.find();
      return categories;
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
      if (!category) {
        throw new NotFoundException('Categories not found');
      }

      return category;
    } catch (error) {
      console.log(error);
    }
  }

  async create(categoryDto: CategoryDto): Promise<CategoryDto> {
    try {
      const category: any = this.categoryRepository.create(categoryDto);
      return this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
    }
  }

  async update(categoryDto: CategoryDto, id: number): Promise<CategoryDto> {
    try {
      const category: any = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException('category not found');
      }
      const updatedCategory = this.categoryRepository.merge(
        category,
        categoryDto,
      );

      return this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<CategoryDto> {
    try {
      const category: any = await this.categoryRepository.findOne({
        where: { id },
      });
      // Update the deleted_at timestamp
      category.deleted_at = new Date();

      // Save the category with the updated deleted_at timestamp
      const updatedCategory = await this.categoryRepository.save(category);

      return updatedCategory;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
