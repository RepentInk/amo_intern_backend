import {OrderDto} from './order.dto';
import {CustomerDto} from './customer.dto';
import {OrderItemsDto} from './orderItems.dto';

export class CustomerOrdersDto {
  order: OrderDto;
  customer: CustomerDto;
  order_items: OrderItemsDto[];
}