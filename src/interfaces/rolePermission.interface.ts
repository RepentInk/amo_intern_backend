import { RolePermissionDto } from 'src/dto/rolePermission.dto';

export interface RolePermissionInterface {
  findAll(): Promise<RolePermissionDto[]>;
  findRolePermissions(): Promise<any>;
  findOne(id: number): Promise<RolePermissionDto>;
  create(rolePermissionDto: RolePermissionDto): Promise<RolePermissionDto>;
  update(
    rolePermissionDto: RolePermissionDto,
    id: number,
  ): Promise<RolePermissionDto>;
  delete(target: string, id: number): Promise<void>;
}
