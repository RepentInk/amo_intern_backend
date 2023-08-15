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
  BeforeInsert,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderItems } from './orderItems.entity';
import { Customer } from './customer.entity';
import { CustomerDto } from 'src/dto/customer.dto';
import {v4 as uuidv4} from 'uuid';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unique_number: string;

  @BeforeInsert()
  generateUniqueNumber(){
    this.unique_number = uuidv4();
  }
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

  @ManyToOne(() => Users, (user) => user.orders, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  user: Users;

  // @ManyToMany(() => OrderItems, (orderItems) => orderItems.order)
  // orderItems: OrderItems[];

  @OneToOne(() => Customer, (customer) => customer.order, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'customer_id' })
  customer: Customer | CustomerDto;
}
