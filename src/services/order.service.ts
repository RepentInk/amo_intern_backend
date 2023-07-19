import { Injectable } from '@nestjs/common';
import { Order } from 'src/interfaces/order.inteface';

@Injectable()
export class OrderService {
  // private orders = [
  //   {
  //     id: 0,
  //     name: 'admin',
  //     description: '',
  //     created_at: `${Date.now()}`,
  //     updated_at: `${Date.now()}`,
  //     deleted_at: '',
  //   },
  // ];
  getAllOrders(): Order[] {
    return [];
  }
}
