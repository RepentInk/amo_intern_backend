import { OrderItemsDto } from 'src/dto/orderItems.dto';

export interface OrderItemsInterface {
  findAll(): Promise<OrderItemsDto[]>;
  findOne(id: number): Promise<OrderItemsDto>;
  create(OrderItemsDto: OrderItemsDto): Promise<OrderItemsDto>;
  update(OrderItemsDto: OrderItemsDto, id: number): Promise<OrderItemsDto>;
  delete(id: number): Promise<OrderItemsDto>;
}
