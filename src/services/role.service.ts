import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/dto/role.dto';
import { Role } from 'src/interfaces/role.interface';

@Injectable()
export class RoleService {
  private roles = [
    // {
    //   id: 0,
    //   name: 'administrator',
    //   description: 'has all permissions',
    //   created_at: '7/19/2023',
    //   updated_at: '7/19/2023',
    //   deleted_at: '',
    // },
  ];

  getAllRoles(): Role[] {
    return this.roles;
  }

  getRole(id: number): Role {
    const role = this.roles.find((role) => role.id === id);
    if (!role) {
      throw new Error('role not found');
    }

    return role;
  }

  createRole(createRoleDto: CreateRoleDto) {
    if (createRoleDto) {
      createRoleDto['id'] = this.roles.length + 1;
      createRoleDto['created_at'] = Date.now().toLocaleString();
      createRoleDto['updated_at'] = Date.now().toLocaleString();
      createRoleDto['deleted_at'] = '';
      return this.roles.push(createRoleDto);
    }
  }

  updateRole(id: number, updateRole: CreateRoleDto) {
    const oldRole = this.roles.find((role) => role.id === id);
    if (!oldRole) {
      throw new Error('user not found');
    }
    this.roles = this.roles.map((role) =>
      role.id === id ? { ...role, ...updateRole } : role,
    );
    return this.getRole(id);
  }

  removeRole(id: number) {
    const roleToRemove = this.roles.find((role) => role.id === id);
    this.roles = this.roles.filter((role) => role.id !== id);
    return roleToRemove;
  }
}
