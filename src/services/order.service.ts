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
    const allOrders = this.orders.filter((order) => order.deleted_at === '');
    return allOrders;
  }

  getOrder(id: number): Order {
    const allOrders = this.orders.filter((order) => order.deleted_at === '');
    const order = allOrders.find((order) => order.id === id);
    if (!order) {
      throw new Error('order not found');
    }

    return order;
  }

  createOrder(createOrderDto: CreateOrderDto) {
    createOrderDto['id'] = this.orders.at(-1) ? this.orders.at(-1).id + 1 : 0;
    createOrderDto['created_at'] = Date.now().toLocaleString();
    createOrderDto['updated_at'] = Date.now().toLocaleString();
    createOrderDto['deleted_at'] = '';
    this.orders.push(createOrderDto);
    return createOrderDto;
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
    if (!orderToRemove) {
      throw new Error('order not found');
    }
    orderToRemove['deleted_at'] = Date.now();
    this.orders = this.orders.map((order) =>
      order.id === id ? { ...order, ...orderToRemove } : order,
    );
    return orderToRemove;
  }
}
