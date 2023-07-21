import { Injectable, NotFoundException } from '@nestjs/common';
import { Items } from 'src/interface/items.interface';

@Injectable()
export class ItemsService {
  private items: Items[] = [];
  private current_id = 0; // initialize the current id

  // function to autogenerate the id
  private autoGenerateId(): number {
    this.current_id++; // auto=increment by 1
    return this.current_id;
  }

  async create(items: Items): Promise<{ message: string; items: Items }> {
    try {
      const id = this.autoGenerateId(); // set the id to the auto generated id
      const created_at = new Date(); // set created_at date

      // define the new item
      const newItem: Items = {
        id,
        name: items.name,
        description: items.description,
        unit: items.unit,
        price: items.price,
        category_id: items.category_id,
        created_at,
        updated_at: null,
        deleted_at: null,
        ...items,
      };
      this.items.push(newItem);
      return {
        message: 'Successful!',
        items: newItem,
      };
    } catch (error) {
      throw new Error('Failed');
    }
  }

  // get all items
  async getAllItems(): Promise<Items[]> {
    return this.items;
  }

  //get an item by the id
  async getOneItem(id: number): Promise<Items> {
    const Item = this.items.find((items) => (items.id = id));
    if (!Item) {
      throw new NotFoundException('Item not found');
    }
    return Item;
  }

  //Update an item using its id
  async updateItem(id: number, updateItem: Items) {
    const existingItem = this.items.find((item) => (item.id = id));
    if (!existingItem) {
      throw new NotFoundException('Item does not exist!');
    }

    existingItem.name = updateItem.name;
    existingItem.description = updateItem.description;
    existingItem.unit = updateItem.unit;
    existingItem.price = updateItem.price;
    existingItem.updated_at = updateItem.updated_at;

    return {
      message: 'Update successful',
      item: updateItem,
    };
  }

  //delete an item by the id
  async deleteItem(id: number): Promise<{ message: string }> {
    const existingItem = this.items.find((item) => (item.id = id));
    if (!existingItem) {
      throw new NotFoundException('Item not found!');
    }
    this.items = this.items.filter((item) => item.id === id);
    return {
      message: 'Item deleted successfully!',
    };
  }
}
