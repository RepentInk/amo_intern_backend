import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from 'src/interfaces/role.interface';
import { CreateRoleDto } from 'src/dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles(): Role[] {
    try {
      return this.roleService.getAllRoles();
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  createRole(@Body(new ValidationPipe()) createRoleDto: CreateRoleDto) {
    try {
      return this.roleService.createRole(createRoleDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: CreateRoleDto) {
    return { id };
  }

  @Delete(':id')
  removeRole(@Param('id') id: number) {
    return { id };
  }
}
