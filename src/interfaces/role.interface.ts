import { RoleDto } from 'src/dto/role.dto';
export interface Role {
  getAllRoles(): Promise<RoleDto[]>;
  getOneRole(id: number): Promise<RoleDto>;
  createRole(newRole: RoleDto): Promise<RoleDto>;
  updateRole(id: number, updateInfo: RoleDto): Promise<RoleDto>;
  deleteRole(id: number): Promise<void>;
}
