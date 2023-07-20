import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RolePermissionsService } from '../services/rolepermissions.service';
import { RolePermissions } from 'src/dto/rolepermissions.dto';

@Controller('rolepermissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @Post('create')
  createRolePermission(@Body() rolePermission: RolePermissions) {
    console.log(rolePermission);
    return this.rolePermissionsService.createRolePermission(rolePermission);
  }

  @Get()
  getAllRolePermissions(): RolePermissions[] {
    return this.rolePermissionsService.getAllRolePermissions();
  }

  @Get(':id')
  getAllPermissionsById(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionsService.getRolePermissionsById(id);
  }

  @Put(':id')
  updateRolePermission(
    @Param('id') id: number,
    @Body() rolePermission: RolePermissions,
  ) {
    return this.rolePermissionsService.updateRolePermission(id, rolePermission);
  }

  @Delete(':id')
  deleteRolePermission(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionsService.deleteRolePermission(id);
  }
}
