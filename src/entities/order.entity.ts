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
  BeforeInsert
} from 'typeorm';
import { Users } from './users.entity';
import { Customer } from './customer.entity';
import {v4 as uuidv4} from 'uuid';
import { CustomerDto } from 'src/dto/customer.dto';

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

  @ManyToOne(() => Users, (user) => user.orders, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToOne(() => Customer, (customer) => customer.order, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'customer_id' })
  customer: Customer | CustomerDto;

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
