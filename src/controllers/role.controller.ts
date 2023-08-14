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
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Role')
@Controller('roles')
export class RoleController implements BasicController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'get all roles' })
  @ApiResponse({ status: 200, description: 'successful', type: [RoleDto] })
  findAll(): Promise<RoleDto[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one role' })
  @ApiResponse({ status: 200, description: 'role found', type: RoleDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<RoleDto> {
    return this.roleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'create role' })
  @ApiParam(
    { 
      name: 'permissions', 
      required: true, 
      description: 'All permissions that need to be assigned to the role',
      type: Array,
      example: [1, 3, 4, 2]
  })
  @ApiParam(
    { 
      name: 'description', 
      required: true, 
      description: 'Role name description',
      type: String,
      example: "Performs all activities in the system"
  })
  @ApiParam(
    { 
      name: 'name', 
      required: true, 
      description: 'Name of role',
      type: String,
      example: "Administrator"
  })
  @ApiResponse({ status: 200, description: 'role created', type: RoleDto })
  @UsePipes(new ValidationPipe())
  create(@Body() roleDto: RoleDto): Promise<RoleDto> {
    return this.roleService.create(roleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update role' })
  @ApiParam(
    { 
      name: 'permissions', 
      required: true, 
      description: 'All permissions that need to be assigned to the role',
      type: Array,
      example: [1, 2]
  })
  @ApiParam(
    { 
      name: 'description', 
      required: true, 
      description: 'Role name description',
      type: String,
      example: "Performs all activities in the system"
  })
  @ApiParam(
    { 
      name: 'name', 
      required: true, 
      description: 'Name of role',
      type: String,
      example: "Administrator"
  })
  @ApiResponse({ status: 200, description: 'role updated', type: RoleDto })
  update(
    @Body() roleDto: RoleDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.roleService.update(roleDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete role' })
  @ApiResponse({ status: 200, description: 'role deleted', type: RoleDto })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.delete(id);
  }
}
