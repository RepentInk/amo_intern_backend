import { PermissionDto } from 'src/dto/permission.dto';

export interface PermissionInterface {
  findAll(): Promise<PermissionDto[]>;
  findOne(id: number): Promise<PermissionDto>;
  create(permissionDto: PermissionDto): Promise<PermissionDto>;
  update(permissionDto: PermissionDto, id: number): Promise<PermissionDto>;
  delete(id: number): Promise<PermissionDto>;
}
