export interface Order {
  id: number;
  unique_number: string;
  order_code: string;
  customer_id: number;
  user_id: number;
  delivery_point: string;
  payment: number;
  status: string;
  amount_paid: number;
  payment_mode: string;
  order_channel: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
