import { Injectable } from '@nestjs/common';
import { MockOrderItem, mockOrderItems } from '../mockup';
import { json } from 'node:stream/consumers';

@Injectable()
export class OrderItemService {
  createOrderItem(
    order_id: number,
    item_id: number,
    quantity: number,
    price: number,
  ): MockOrderItem {
    const id = mockOrderItems.length + 1;
    const created_at = new Date();
    const updated_at = new Date();

    const orderItem = new MockOrderItem(
      id,
      order_id,
      item_id,
      quantity,
      price,
      created_at,
      updated_at,
      null,
    );

    mockOrderItems.push(orderItem);

    return orderItem;
  }

  getAllOrderItems(): MockOrderItem[] {
    return mockOrderItems;
  }

  getOrderItemsByOrderId(order_id: number): MockOrderItem[] {
    return mockOrderItems.filter((item) => item.order_id === order_id);
  }

  getOrderItemsByItemId(item_id: number): MockOrderItem[] {
    return mockOrderItems.filter((item) => item.item_id === item_id);
  }

  updateOrderItem(
    id: number,
    quantity: number,
    price: number,
  ): MockOrderItem | null {
    const orderItem = mockOrderItems.find((item) => item.id === id);

    if (orderItem) {
      orderItem.quantity = quantity;
      orderItem.price = price;
      orderItem.updated_at = new Date();
    }

    return orderItem || null;
  }

  deleteOrderItem(id: number): boolean {
    const index = mockOrderItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      mockOrderItems.splice(index, 1);
      return true;
    }

    return false;
  }
}
