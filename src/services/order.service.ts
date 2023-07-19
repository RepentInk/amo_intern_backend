import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Order } from 'src/interfaces/order.inteface';

@Injectable()
export class OrderService {
  private orders = [
    // {
    //   id: 0,
    //   name: 'administrator',
    //   description: 'has all permissions',
    //   created_at: '7/19/2023',
    //   updated_at: '7/19/2023',
    //   deleted_at: '',
    // },
  ];

  getAllOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: number): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new Error('order not found');
    }

    return order;
  }

  createOrder(createOrderDto: CreateOrderDto) {
    if (createOrderDto) {
      createOrderDto['id'] = this.orders.length + 1;
      createOrderDto['created_at'] = Date.now().toLocaleString();
      createOrderDto['updated_at'] = Date.now().toLocaleString();
      createOrderDto['deleted_at'] = '';
      return this.orders.push(createOrderDto);
    }
  }

  updateOrder(id: number, updateOrder: CreateOrderDto) {
    const oldOrder = this.orders.find((order) => order.id === id);
    if (!oldOrder) {
      throw new Error('order not found');
    }
    this.orders = this.orders.map((order) =>
      order.id === id ? { ...order, ...updateOrder } : order,
    );
    return this.getOrder(id);
  }

  removeOrder(id: number) {
    const orderToRemove = this.orders.find((order) => order.id === id);
    this.orders = this.orders.filter((order) => order.id !== id);
    return orderToRemove;
  }
}
