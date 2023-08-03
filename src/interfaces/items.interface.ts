import { ItemsDto } from 'src/dto/items.dto';

export interface ItemsInterface {
  findAll(): Promise<ItemsDto[]>;
  findOne(id: number): Promise<ItemsDto>;
  create(itemsDto: ItemsDto): Promise<ItemsDto>;
  update(itemsDto: ItemsDto, id: number): Promise<ItemsDto>;
  delete(id: number): Promise<ItemsDto>;
}
