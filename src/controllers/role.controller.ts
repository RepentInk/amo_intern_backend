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
  UsePipes,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { BasicController } from 'src/interfaces/controller.interface';
import { RoleDto } from 'src/dto/role.dto';

@Controller('roles')
export class RoleController implements BasicController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<RoleDto[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleDto> {
    return this.roleService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() roleDto: RoleDto): Promise<RoleDto> {
    return this.roleService.create(roleDto);
  }

  @Put(':id')
  update(
    @Body() roleDto: RoleDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.roleService.update(roleDto, id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
