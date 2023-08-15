import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Categories } from './category.entity';
import { OrderItems } from './orderItems.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  unit: number;

  @Column()
  price: number;

  @ManyToOne(() => Categories, (category) => category.items, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Categories;

  // @ManyToMany(() => OrderItems, (orderItems) => orderItems.items)
  // orderItems: OrderItems;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
