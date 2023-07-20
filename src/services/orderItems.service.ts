import { Injectable } from '@nestjs/common';
import { MockOrderItem, mockOrderItems } from '../mockup';
import { json } from 'node:stream/consumers';

@Injectable()
export class OrderItemService {
  createOrderItems(
    order_id: number,
    orderItemsData: {
      item_id: number;
      quantity: number;
      price: number;
    }[],
  ): MockOrderItem[] {
    const created_at = new Date();
    const updated_at = new Date();

    const createdOrderItems: MockOrderItem[] = orderItemsData.map(
      (orderItemData, index) => {
        const id = mockOrderItems.length + index + 1;

        const orderItem = new MockOrderItem(
          id,
          order_id,
          orderItemData.item_id,
          orderItemData.quantity,
          orderItemData.price,
          created_at,
          updated_at,
          null,
        );

        return orderItem;
      },
    );

    mockOrderItems.push(...createdOrderItems);

    return createdOrderItems;
  }

  getItemsInAllOrders(): MockOrderItem[] {
    return mockOrderItems;
  }

  getItemsInOneOrder(id: number): MockOrderItem | null {
    return mockOrderItems.find((item) => item.id === id) || null;
  }

  editOrderItems(
    order_id: number,
    orderItemsData: {
      id: number;
      item_id?: number;
      quantity?: number;
      price?: number;
    }[],
  ): MockOrderItem[] {
    const updated_at = new Date();

    const updatedOrderItems: MockOrderItem[] = orderItemsData.map(
      (orderItemData) => {
        const orderItem = mockOrderItems.find(
          (item) => item.id === orderItemData.id,
        );
        if (orderItem) {
          orderItem.item_id = orderItemData.item_id ?? orderItem.item_id;
          orderItem.quantity = orderItemData.quantity ?? orderItem.quantity;
          orderItem.price = orderItemData.price ?? orderItem.price;
          orderItem.updated_at = updated_at;
        }
        return orderItem;
      },
    );
    return updatedOrderItems;
  }

  deleteItemsInAnOrder(order_id: number): MockOrderItem[] {
    const orderItemsToDelete = mockOrderItems.filter(
      (item) => item.order_id === order_id,
    );

    if (orderItemsToDelete.length === 0) {
      return [];
    }

    for (const orderItem of orderItemsToDelete) {
      orderItem.deleted_at = new Date();
    }

    return orderItemsToDelete;
  }
}
