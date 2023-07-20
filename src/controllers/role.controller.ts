import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ValidationPipe,
  ParseIntPipe,
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

  @Get(':id')
  getRole(@Param('id', ParseIntPipe) id: number): Role {
    try {
      return this.roleService.getRole(id);
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
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: CreateRoleDto,
  ) {
    try {
      return this.roleService.updateRole(id, updateRoleDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  removeRole(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.roleService.removeRole(id);
    } catch (error) {
      console.log(error);
    }
  }
}
