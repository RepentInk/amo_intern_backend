import { Injectable } from '@nestjs/common';
import { PermissionInterface } from 'src/interfaces/permission.interface';
import { PermissionDto } from 'src/dto/permission.dto';

@Injectable()
export class PermissionService {
  //
  private permission = [];

  // Get all permissions
  getAllPermission(name?: string): PermissionInterface[] {
    if (name) {
      const getPermission = this.permission.filter((permission) => {
        return permission.name === name;
      });
      return getPermission;
    } else {
      return this.permission;
    }
  }

  // Get One Permission By id
  getOnePermission(id: number): PermissionInterface {
    const permission = this.permission.find((perName) => perName.id === id);
    if (!permission) {
      throw new Error('Permission Not Found');
    }
    return permission;
  }

  // Create a new permission
  createPermission(newPermission: PermissionDto): PermissionDto {
    const id = Math.floor(Math.random() * 10000);
    this.permission.push({ id, ...newPermission });
    return this.getOnePermission(id);
  }

  // Update Permission
  updatePermission(id: number, updatePermission: PermissionDto) {
    this.permission = this.permission.map((permission) => {
      if (permission.id == id) {
        return { ...permission, ...updatePermission };
      }
      return permission;
    });
    return this.getOnePermission(id);
  }

  // Delete Permission
  deletePermission(id: number) {
    this.permission = this.permission.filter((permission) => {
      return permission.id !== id;
    });
    return this.getAllPermission();
  }
}
