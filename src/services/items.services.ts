import { Injectable, NotFoundException } from '@nestjs/common';
import { Items } from 'src/interface/items.interface';

@Injectable()
export class ItemsService {
  private items: Items[] = [];

  async create(items: Items): Promise<{ message: string; items: Items }> {
    try {
      this.items.push(items);
      return {
        message: 'Successful!',
        items,
      };
    } catch (error) {
      throw new Error('Failed');
    }
  }

  async getAllItems(): Promise<Items[]> {
    return this.items;
  }

  async getOneItem(id: number): Promise<Items> {
    const Item = this.items.find((items) => items.id === id);
    if (!Item) {
      throw new NotFoundException('Item not found');
    }
    return Item;
  }

  //Update an item using its id
  async updateItem(id: number, updateItem: Items) {
    const existingItem = this.items.find((item) => item.id === id);
    if (!existingItem) {
      throw new NotFoundException('Item does not exist!');
    }
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, ...updateItem } : item,
    );
    return {
      message: 'Update successful',
      item: updateItem,
    };
  }

  async deleteItem(id: number): Promise<{ message: string }> {
    const existingItem = this.items.find((item) => item.id === id);
    if (!existingItem) {
      throw new NotFoundException('Item not found!');
    }
    this.items = this.items.filter((item) => item.id === id);
    return {
      message: 'Item deleted successfully!',
    };
  }
}
