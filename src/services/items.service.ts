import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsDto } from 'src/dto/items.dto';
import { Items } from 'src/entities/items.entity';
import { ItemsInterface } from 'src/interfaces/items.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
const successMessage = 'Items retrieved successfully';

@Injectable()
export class ItemsService implements ItemsInterface {
  constructor(
    @InjectRepository(Items) private itemRepository: Repository<Items>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}
  async findAll(): Promise<ItemsDto[]> {
    try {
      const items: any = await this.itemRepository.find({
        where: { deleted_at: null },
      });
      return this.responseHandlerService.successResponse(successMessage, items);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async findOne(id: number): Promise<ItemsDto> {
    try {
      const item: any = await this.itemRepository.findOne({ where: { id } });
      if (item.deleted_at !== null) {
        throw new NotFoundException('item not found');
      }
      if (!item) {
        throw new NotFoundException('Item not found');
      }

      return this.responseHandlerService.successResponse(successMessage, item);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
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
      if (item.deleted_at !== null) {
        throw new NotFoundException('item not found');
      }
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      this.itemRepository.merge(item, itemsDto);
      const updatedItem = await this.itemRepository.save(item);
      return this.responseHandlerService.successResponse(
        successMessage,
        updatedItem,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async delete(id: number): Promise<ItemsDto> {
    try {
      const item: any = await this.itemRepository.findOne({ where: { id } });
      if (item.deleted_at !== null) {
        throw new NotFoundException('item not found');
      }
      item.deleted_at = new Date();
      const deletedItem = await this.itemRepository.save(item);
      return this.responseHandlerService.successResponse(
        successMessage,
        deletedItem,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }
}
