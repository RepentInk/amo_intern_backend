import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => Users, (users) => users.userLog)
  @JoinColumn({ name: 'user_id' })
  userLog: UserLog;
}
