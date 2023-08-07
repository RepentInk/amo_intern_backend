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
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('permssion')
@Controller('permission')
export class PermissionController implements BasicController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'get all permissions' })
  @ApiResponse({
    status: 200,
    description: 'successful',
    type: [PermissionDto],
  })
  findAll(): Promise<any> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one permission' })
  @ApiResponse({
    status: 200,
    description: 'permission found',
    type: PermissionDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.permissionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'create permission' })
  @ApiResponse({
    status: 200,
    description: 'permission created',
    type: PermissionDto,
  })
  @UsePipes(new ValidationPipe())
  create(@Body() permissionDto: PermissionDto): Promise<any> {
    return this.permissionService.create(permissionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a permission' })
  @ApiResponse({
    status: 200,
    description: 'permission updated',
    type: PermissionDto,
  })
  update(
    @Body() permissionDto: PermissionDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return this.permissionService.update(permissionDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete permission' })
  @ApiResponse({
    status: 200,
    description: 'permission deleted',
    type: PermissionDto,
  })
  delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.permissionService.delete(id);
  }
}
