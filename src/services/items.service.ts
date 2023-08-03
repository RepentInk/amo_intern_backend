import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsDto } from 'src/dto/items.dto';
import { Items } from 'src/entities/items.entity';
import { ItemsInterface } from 'src/interfaces/items.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService implements ItemsInterface {
  constructor(
    @InjectRepository(Items) private itemRepository: Repository<Items>,
  ) {}

  async findAll(): Promise<ItemsDto[]> {
    try {
      const items: any = await this.itemRepository.find();
      return items;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while fetching users');
    }
  }

  async findOne(id: number): Promise<ItemsDto> {
    try {
      const item: any = await this.itemRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException('Item not found');
      }

      return item;
    } catch (error) {
      console.log(error);
    }
  }

  async create(itemsDto: ItemsDto): Promise<ItemsDto> {
    try {
      const item: any = this.itemRepository.create(itemsDto);
      return await this.itemRepository.save(item);
    } catch (error) {
      console.log(error);
    }
  }

  async update(itemsDto: ItemsDto, id: number): Promise<ItemsDto> {
    try {
      const item: any = await this.itemRepository.findOne({ where: { id } });
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      this.itemRepository.merge(item, itemsDto);
      return this.itemRepository.save(item);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<ItemsDto> {
    try {
      const item: any = await this.itemRepository.findOne({ where: { id } });
      await this.itemRepository.remove(item);
      return item;
    } catch (error) {
      console.log(error);
    }
  }
}
