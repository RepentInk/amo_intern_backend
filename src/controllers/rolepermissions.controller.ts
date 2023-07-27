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
  constructor(
    private readonly rolePermissionService: RolePermissionService,
  ) {}
  @Get()
  findAll(): Promise<any> {
    return this.rolePermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.rolePermissionService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() rolePermissionDto: RolePermissionDto): Promise<any> {
    return this.rolePermissionService.create(rolePermissionDto);
  }

  @Put(':id')
  update(
    @Body() rolePermissionDto: RolePermissionDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.rolePermissionService.update(rolePermissionDto, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionService.delete(id)
}
