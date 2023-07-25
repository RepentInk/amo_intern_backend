import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
}
