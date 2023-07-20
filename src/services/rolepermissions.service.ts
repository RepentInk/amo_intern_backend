import { Injectable } from '@nestjs/common';
import { RolePermissions } from 'src/dto/rolepermissions.dto';

@Injectable()
export class RolePermissionsService {
  private allRolePermissions = [];
  createRolePermission(newRolePermission: RolePermissions) {
    this.allRolePermissions.push(newRolePermission);
    return newRolePermission;
  }
  getAllRolePermissions(): RolePermissions[] {
    return this.allRolePermissions;
  }

  getRolePermissionsById(id: number) {
    const findRolePermission = this.allRolePermissions.find(
      (rolePermission) => rolePermission.id == id,
    );
    return findRolePermission;
  }
  updateRolePermission(id: number, updateRolePermission: RolePermissions) {
    this.allRolePermissions = this.allRolePermissions.map((rolePermission) => {
      if (rolePermission.id == id) {
        return { ...rolePermission, ...updateRolePermission };
      } else return rolePermission;
    });
    return this.getRolePermissionsById(id);
  }
  deleteRolePermission(id: number) {
    this.allRolePermissions = this.allRolePermissions.filter(
      (rolePermission) => rolePermission.id !== id,
    );
    return this.allRolePermissions;
  }
}
