import { PermissionDto } from 'src/dto/permission.dto';
export interface PermissionInterface {
  getAllPermissions(): Promise<PermissionDto[]>;
  getOnePermission(id: number): Promise<PermissionDto>;
  createPermission(newRole: PermissionDto): Promise<PermissionDto>;
  updatePermission(
    id: number,
    updateInfo: PermissionDto,
  ): Promise<PermissionDto>;
  deletePermission(id: number): Promise<void>
}
