import { IsUUID, IsEnum } from 'class-validator';

export class CreateOrderDto {
  id: number;

  @IsUUID()
  unique_number: string;

  order_code: string;
  customer_id: number;
  user_id: number;
  delivery_point: string;

  @IsEnum(['half_payment', 'full_payment'])
  payment: string;

  status: string;
  amount_paid: number;
  payment_mode: string;
  order_channel: string;
}