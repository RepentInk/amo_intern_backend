import { Controller, Get } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from 'src/interfaces/role.interface';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles(): Role[] {
    return this.roleService.getAllRoles();
  }
}
