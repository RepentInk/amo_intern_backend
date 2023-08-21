import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { PermissionInterface } from 'src/interfaces/permission.interface';
import { PermissionDto } from 'src/dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from '../services/responseHandler.service';

@Injectable()
export class PermissionService implements PermissionInterface {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<PermissionDto[]> {
    try {
      const allPermissions = await this.permissionRepository.find();
      return this.responseHandlerService.successResponse(allPermissions);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error
      );
    }
  }

  async findByIds(permissionIds: any[]): Promise<any[]> {
    try {
      // find each permission
      const permissions = await this.permissionRepository.find({
        where: [...permissionIds.map((permissionId) => ({ id: permissionId }))],
      });
      if (!permissions || permissions.length !== permissionIds.length) {
        throw new NotFoundException('One or More Permissions not found');
      }
      return this.responseHandlerService.successResponse(permissions);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error
      );
    }
  }

  async findOne(id: number): Promise<PermissionDto> {
    try {
      const permission = await this.permissionRepository.findOne({
        where: { id },
      });
      if (!permission) {
        throw new NotFoundException('Permsission not found');
      }
      return this.responseHandlerService.successResponse(permission);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error
      );
    }
  }

  async create(permissionDto: PermissionDto): Promise<PermissionDto> {
    try {
      const permissionExit = await this.permissionRepository.findOne({
        where: { name: permissionDto.name },
      });
      if (permissionExit) {
        throw new ConflictException('permission already exists');
      }
      const permission = await this.permissionRepository.create(permissionDto);
      const data = await this.permissionRepository.save(permission);
      return this.responseHandlerService.successResponse(
        data,
        'permission created',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error
      );
    }
  }

  async update(
    permissionDto: PermissionDto,
    id: number,
  ): Promise<PermissionDto> {
    try {
      const permission: any = await this.findOne(id);
      if (!permission.data) {
        throw new NotFoundException('Permission not found');
      }

      this.permissionRepository.merge(permission.data, permissionDto);

      const data = await this.permissionRepository.save(permission.data);

      return this.responseHandlerService.successResponse(
        data,
        'permission updated',
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error
      );
    }
  }

  async delete(id: number): Promise<PermissionDto> {
    try {
      const permission: any = await this.findOne(id);
      await this.permissionRepository.remove(permission);
      return this.responseHandlerService.successResponse(
        permission,
        'permission deleted',
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error
      );
    }
  }
}
