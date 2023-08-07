import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Users } from './users.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission', // Specify the name of the pivot table
    joinColumn: {
      name: 'role_id', // Specify the name of the foreign key column for Role
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id', // Specify the name of the foreign key column for Permission
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  permission: Permission[];
}
