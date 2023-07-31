import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Items, (item) => item.category)
  items: Items[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
