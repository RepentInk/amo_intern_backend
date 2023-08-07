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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('role')
@Controller('roles')
export class RoleController implements BasicController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'get all roles' })
  @ApiResponse({ status: 200, description: 'successful' })
  findAll(): Promise<RoleDto[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one role' })
  @ApiResponse({ status: 200, description: 'role found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleDto> {
    return this.roleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'create role' })
  @ApiResponse({ status: 200, description: 'role created' })
  @UsePipes(new ValidationPipe())
  create(@Body() roleDto: RoleDto): Promise<RoleDto> {
    return this.roleService.create(roleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update role' })
  @ApiResponse({ status: 200, description: 'role updated' })
  update(
    @Body() roleDto: RoleDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.roleService.update(roleDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete role' })
  @ApiResponse({ status: 200, description: 'role deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
