import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_id: number;

  @Column()
  item_id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
