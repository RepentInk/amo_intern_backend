import { Injectable } from '@nestjs/common';
import { RolePermissions } from 'src/dto/rolepermissions.dto';

@Injectable()
export class RolePermissionsService {
  private allRolePermissions = [];
  //adding  new rolepermission
  createRolePermission(newRolePermission: RolePermissions) {
    this.allRolePermissions.push(newRolePermission);
    return newRolePermission;
  }
  //getting all the rolepermissions
  getAllRolePermissions(): RolePermissions[] {
    return this.allRolePermissions;
  }
  //getting rolepermission based on id
  getRolePermissionsById(id: number) {
    const findRolePermission = this.allRolePermissions.find(
      (rolePermission) => rolePermission.id == id,
    );
    return findRolePermission;
  }
  //updating an existing rolepermission
  updateRolePermission(id: number, updateRolePermission: RolePermissions) {
    this.allRolePermissions = this.allRolePermissions.map((rolePermission) => {
      if (rolePermission.id == id) {
        return { ...rolePermission, ...updateRolePermission };
      } else return rolePermission;
    });
  }
  //delete a rolepermission
  deleteRolePermission(id: number) {
    this.allRolePermissions = this.allRolePermissions.filter(
      (rolePermission) => rolePermission.id !== id,
    );
    return this.allRolePermissions;
  }
}
