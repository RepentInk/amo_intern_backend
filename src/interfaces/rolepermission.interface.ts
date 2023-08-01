import { RolePermissionDto } from 'src/dto/rolepermissions.dto';
import { RolePermission } from 'src/entities/rolepermssion.entity';

export interface RolePermissionInterface {
  findAll(): Promise<RolePermissionDto[]>;
  findOne(id: number): Promise<RolePermissionDto>;
  create(rolePermissionDto: RolePermissionDto): Promise<RolePermissionDto>;
  update(rolePermissionDto: RolePermissionDto, id: number): Promise<RolePermissionDto>;
  delete(id: number): Promise<RolePermissionDto>
}
