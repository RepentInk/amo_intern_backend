import {
    Entity,
    Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_id: number;

  @Column()
  permission_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
