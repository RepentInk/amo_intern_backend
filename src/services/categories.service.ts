import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/interface/categories.interface';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  // create a category using async and try-catch
  async create(
    category: Category,
  ): Promise<{ message: string; category: Category }> {
    try {
      this.categories.push(category);
      return {
        message: 'Successful', // return successful message and the category created
        category: category,
      };
    } catch (error) {
      throw new Error('Failed');
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categories;
  }

  // Find one category with its id
  async getOneCategory(id: number): Promise<Category> {
    const OneCategory = this.categories.find((category) => category.id === id);
    if (!OneCategory) {
      throw new NotFoundException('Category not found');
    }
    return OneCategory;
  }

  // Update an existing category using its id
  async updateCategory(id: number, updateCategory: Category) {
    const existingCategory = this.categories.find(
      (category) => category.id === id,
    );
    if (!existingCategory) {
      throw new NotFoundException('Category does not exist');
    }
    this.categories = this.categories.map((category) =>
      category.id === id ? { ...category, ...updateCategory } : category,
    );
    return {
      message: 'Update successful',
      category: updateCategory,
    };
  }

  // Delete a category using its id
  async deleteCategory(id: number): Promise<{ message: string }> {
    const existingCategory = this.categories.find(
      (category) => category.id === id,
    );
    if (!existingCategory) {
      throw new NotFoundException('Category not found!');
    }
    this.categories = this.categories.filter((category) => category.id !== id);
    return {
      message: 'Successfully deleted',
    };
  }
}
