import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemsDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;

  @IsDate()
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
