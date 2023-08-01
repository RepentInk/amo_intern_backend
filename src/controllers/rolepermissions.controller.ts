import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolePermissionService } from '../services/rolepermissions.service';
import { BasicController } from 'src/interfaces/controller.interface';
import { RolePermissionDto } from 'src/dto/rolepermissions.dto';

@Controller('rolepermissions')
export class RolePermissionsControlle implements BasicController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Get()
  findAll(): Promise<RolePermissionDto[]> {
    return this.rolePermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RolePermissionDto> {
    return this.rolePermissionService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() rolePermissionDto: RolePermissionDto,
  ): Promise<RolePermissionDto> {
    return this.rolePermissionService.create(rolePermissionDto);
  }

  @Put(':id')
  update(
    @Body() rolePermissionDto: RolePermissionDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RolePermissionDto> {
    return this.rolePermissionService.update(rolePermissionDto, id);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RolePermissionDto> {
    return await this.rolePermissionService.delete(id);
  }
}
