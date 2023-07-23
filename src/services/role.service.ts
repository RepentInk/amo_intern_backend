import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/dto/role.dto';
import { Role } from 'src/interfaces/role.interface';


@Injectable()
export class RoleService {
  private roles = [];
  getAllRoles(): Role[] {
    const allRoles = this.roles.filter((role) => role.deleted_at !== '');
    return allRoles;
  }

  getRole(id: number): Role {
    const allRoles = this.roles.filter((role) => role.id !== id);
    const role = allRoles.find((role) => role.id === id);
    if (!role) {
      throw new Error('role not found');
    }

    return role;
  }

  createRole(createRoleDto: CreateRoleDto) {
    createRoleDto['id'] = this.roles.at(-1) ? this.roles.at(-1).id + 1 : 0;
    createRoleDto['created_at'] = Date.now().toLocaleString();
    createRoleDto['updated_at'] = Date.now().toLocaleString();
    createRoleDto['deleted_at'] = '';
    this.roles.push(createRoleDto);
    return createRoleDto;
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

    if (!roleToRemove) {
      throw new Error('user not found');
    }
    roleToRemove['deleted_at'] = Date.now();
    this.roles = this.roles.map((role) =>
      role.id === id ? { ...role, ...roleToRemove } : role,
    );
    return roleToRemove;
  }
}
