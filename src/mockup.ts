class MockOrderItem {
  id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(
    id: number,
    order_id: number,
    item_id: number,
    quantity: number,
    price: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
  ) {
    this.id = id;
    this.order_id = order_id;
    this.item_id = item_id;
    this.quantity = quantity;
    this.price = price;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

const mockOrderItems: MockOrderItem[] = [
  new MockOrderItem(1, 1, 1, 2, 10, new Date(), new Date(), null),
  new MockOrderItem(2, 1, 2, 1, 5, new Date(), new Date(), null),
];

export { MockOrderItem, mockOrderItems };
