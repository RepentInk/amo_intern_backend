import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity: string;

  @Column()
  model: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Users, (users) => users.userLog)
  @JoinColumn({ name: 'user_id' })
  user: Users;
  user_id: number;
}
