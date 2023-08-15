import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Users } from './users.entity';
import { Items } from './items.entity';
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

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToMany(() => Items)
  @JoinTable({
    name: 'order_items', // Specify the name of the pivot table
    joinColumn: {
      name: 'order_id', // Specify the name of the foreign key column for Role
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'item_id', // Specify the name of the foreign key column for Permission
      referencedColumnName: 'id',
    },
  })
  items: Items[];

  @OneToOne(() => Customer, (customer) => customer.order)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  
}
