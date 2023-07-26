import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'role_id' })
  roleId: number;
  @Column({ name: 'permission_id' })
  permissionId: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
