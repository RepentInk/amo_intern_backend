// customer.entity.ts
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  organization?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => Order, (order) => order.customer)
  order: Order;
}
