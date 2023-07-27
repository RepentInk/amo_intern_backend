import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { PermissionDto } from 'src/dto/permission.dto';
import { BasicController } from 'src/interfaces/controller.interface';
@Controller('permission')
export class PermissionController implements BasicController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(): Promise<any> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.permissionService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() permissionDto: PermissionDto): Promise<any> {
    return this.permissionService.create(permissionDto);
  }

  @Put(':id')
  update(
    @Body() permissionDto: PermissionDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.permissionService.update(permissionDto, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.permissionService.delete(id);
  }
}
