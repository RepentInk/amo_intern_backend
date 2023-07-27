import { RoleDto } from "src/dto/role.dto";

export interface Role {

  readAll(): Promise<RoleDto[]>;

  readOne(roleDto: RoleDto): Promise<RoleDto>

  create(roleDto: RoleDto): Promise<RoleDto>;

  update(sroleDto: RoleDto, id: number): Promise<RoleDto>;

  delete(roleDto: RoleDto): Promise<RoleDto>;

}
