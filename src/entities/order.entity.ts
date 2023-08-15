import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderItems } from './orderItems.entity';
import { Customer } from './customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unique_number: string;

  @Column()
  order_code: string;

  @Column()
  delivery_point: string;

  @Column()
  payment: string;

  @Column()
  status: string;

  @Column()
  amount_paid: number;

  @Column()
  payment_mode: string;

  @Column()
  order_channel: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

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

  // @ManyToMany(() => OrderItems, (orderItems) => orderItems.order)
  // orderItems: OrderItems[];

  @OneToOne(() => Customer, (customer) => customer.order)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
