import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/interfaces/categories.interface';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];
  private current_id = 0;

  private autoGenerateId(): number {
    this.current_id++;
    return this.current_id;
  }

  // create a category using async and try-catch
  async create(
    category: Category,
  ): Promise<{ message: string; category: Category }> {
    try {
      const id = this.autoGenerateId();
      const created_at = new Date();

      const newCategory: Category = {
        id,
        name: category.name,
        created_at,
        updated_at: null,
        deleted_at: null,
        ...category,
      };

      this.categories.push(newCategory);

      return {
        message: 'Successful', // return successful message and the category created
        category: newCategory,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed');
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categories;
  }

  // Find one category with its id
  async getOneCategory(id: number): Promise<Category> {
    const OneCategory = this.categories.find((category) => (category.id = id));
    if (!OneCategory) {
      throw new NotFoundException('Category not found');
    }
    return OneCategory;
  }

  // Update an existing category using its id
  async updateCategory(id: number, updateCategory: Category) {
    const existingCategory = this.categories.find(
      (category) => (category.id = id),
    );
    if (!existingCategory) {
      throw new NotFoundException('Category does not exist');
    }
    existingCategory.name = updateCategory.name; //change the existing name to the updated name
    existingCategory.updated_at = new Date(); // change the date in updated _at to current date

    return {
      message: 'Update successful',
      category: updateCategory,
    };
  }

  // Delete a category using its id
  async deleteCategory(id: number): Promise<{ message: string }> {
    const existingCategory = this.categories.find(
      (category) => (category.id = id),
    );
    if (!existingCategory) {
      throw new NotFoundException('Category not found!');
    }
    this.categories = this.categories.filter((category) => category.id !== id);
    existingCategory.deleted_at = new Date(); // set the deleted_at date to current date
    return {
      message: 'Deleted',
    };
  }
}
