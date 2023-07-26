import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { UserLog } from './userLog.entities';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  role_id: number;

  @Column()
  verified: boolean;

  @Column()
  pwd_expired_at: Date;

  @Column({ nullable: true })
  pwd_code: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];

  @OneToMany(() => UserLog, (userLog) => userLog.user_id)
  userLog: UserLog;
}
