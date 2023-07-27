import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderItems } from './orderItems.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unique_number: string;

  @Column()
  order_code: string;

  @Column()
  customer_id: number;

  @Column()
  user_id: string;

  @Column()
  delivery_point: string;

  @Column()
  payment: string;

  @Column()
  status: string;

  @Column()
  amount_paid: string;

  @Column()
  payment_mode: string;

  @Column()
  order_channel: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_atP: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToOne(() => OrderItems, (OrderItems) => OrderItems.order)
  orderItems: OrderItems[];
}