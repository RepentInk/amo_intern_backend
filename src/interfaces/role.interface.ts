import { RoleDto } from 'src/dto/role.dto';

export interface RoleInterface {
  findAll(): Promise<RoleDto[]>;
  findOne(id: number): Promise<RoleDto>;
  create(roleDto: RoleDto): Promise<RoleDto>;
  update(roleDto: RoleDto, id: number): Promise<RoleDto>;
  delete(id: number): Promise<RoleDto>;
}
