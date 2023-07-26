import { RolePermissionDto } from 'src/dto/rolepermissions.dto';
export interface RolePermissionsIternface {
  getAllRolePermissions(): Promise<RolePermissionDto[]>;
  getOneRolePermisson(id: number): Promise<RolePermissionDto>;
  createRolePermisson(newRole: RolePermissionDto): Promise<RolePermissionDto>;
  updateRolePermisson(
    id: number,
    updateInfo: RolePermissionDto,
  ): Promise<RolePermissionDto>;
  deleteRolePermisson(id: number): Promise<void>
}
