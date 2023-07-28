import { RolePermissionDto } from 'src/dto/rolepermissions.dto';
import { RolePermission } from 'src/entities/rolepermssion.entity';

export interface RolePermissionInterface {
  findAll(): Promise<RolePermission[]>;
  findOne(id: number): Promise<RolePermission>;
  create(rolePermissionDto: RolePermissionDto): Promise<RolePermission>;
  update(rolePermissionDto: RolePermissionDto, id: number): Promise<RolePermission>;
  delete(id: number): Promise<RolePermission>
}
