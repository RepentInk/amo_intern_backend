import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';

export interface OrderInterface {
  findAll(): Promise<Order[]>;
  findOne(id: number): Promise<Order>;
  create(orderDto: OrderDto): Promise<Order>;
  update(orderDto: OrderDto, id: number): Promise<Order>;
  delete(id: number): Promise<Order>;
}
