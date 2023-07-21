import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  NotFoundException,
  ParseIntPipe,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { PermissionInterface } from 'src/interfaces/permission.interface';
import { PermissionDto } from 'src/dto/permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  getAllPermission(@Query('name') name: string): PermissionInterface[] {
    try {
      return this.permissionService.getAllPermission(name);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  getOnePermission(@Param('id', ParseIntPipe) id: number): PermissionInterface {
    try {
      return this.permissionService.getOnePermission(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPermission(@Body() newPermission: PermissionDto) {
    return this.permissionService.createPermission(newPermission);
  }

  @Put(':id')
  updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermission: PermissionDto,
  ) {
    return this.permissionService.updatePermission(id, updatePermission);
  }

  @Delete(':id')
  deletePermission(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.deletePermission(id);
  }
}
