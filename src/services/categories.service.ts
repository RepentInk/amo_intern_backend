import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/interfaces/categories.interface';
import { CategoryDto } from 'src/dto/category.dto';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];
  private current_id = 0;

  private autoGenerateId(): number {
    this.current_id++;
    return this.current_id;
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    const id = this.autoGenerateId();
    const created_at = new Date();

    const newCategory: Category = {
      id,
      name: categoryDto.name,
      created_at,
      updated_at: null,
      deleted_at: null,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, categoryDto: CategoryDto): Promise<Category> {
    const existingCategory = this.categories.find(
      (category) => category.id === id,
    );
    if (!existingCategory) {
      throw new NotFoundException('Category does not exist');
    }
    existingCategory.name = categoryDto.name;
    existingCategory.updated_at = new Date();
    return existingCategory;
  }

  async delete(id: number): Promise<void> {
    const existingCategory = this.categories.find(
      (category) => category.id === id,
    );
    if (!existingCategory) {
      throw new NotFoundException('Category not found!');
    }
    this.categories = this.categories.filter((category) => category.id !== id);
    existingCategory.deleted_at = new Date();
  }
}
