import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionDto } from 'src/dto/rolePermission.dto';
import { RolePermission } from 'src/entities/rolePermission.entity';
import { RolePermissionInterface } from 'src/interfaces/rolePermission.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
@Injectable()
export class RolePermissionService implements RolePermissionInterface {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermissionDto>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<RolePermissionDto[]> {
    try {
      const allRoles = await this.rolePermissionRepository.find();
      return this.responseHandlerService.successResponse(allRoles);
    } catch (error) {
      console.log(error);
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async findRolePermissions(): Promise<any> {
    const result = await this.rolePermissionRepository
      .createQueryBuilder('role_permission')
      .select('role_permission.role_id', 'role_id')
      .addSelect('GROUP_CONCAT(role_permission.permission_id)', 'permissions')
      .groupBy('role_permission.role_id')
      .getRawMany();

    const rolePermissionIds = result.map((role) => ({
      role_id: role.role_id,
      permissions: role.permissions.split(',').map((id) => parseInt(id, 10)),
    }));

    return rolePermissionIds;
  }

  async findOne(id: number): Promise<RolePermissionDto> {
    try {
      const rolePermissions = await this.findRolePermissions();
      const role = rolePermissions.find((role) => role.role_id === id);
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      return role;
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async create(
    rolePermissionDto: RolePermissionDto,
  ): Promise<RolePermissionDto> {
    try {
      // assign list of permissions to role
      let data;
      rolePermissionDto.permissions.forEach(async (permission) => {
        const rolePermission = await this.rolePermissionRepository.create({
          role_id: rolePermissionDto.role_id,
          permission_id: permission,
        });
        data = await this.rolePermissionRepository.save(rolePermission);
      });
      return this.responseHandlerService.successResponse(
        data,
        'rolePermission created',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async update(
    rolePermissionDto: RolePermissionDto,
    id: number,
  ): Promise<RolePermissionDto> {
    try {
      const rolePermission = await this.findOne(id);
      if (!rolePermission) {
        throw new NotFoundException('Role not found');
      }
      // update with new properties
      const data = this.rolePermissionRepository.merge(
        rolePermission,
        rolePermissionDto,
      );
      return this.responseHandlerService.successResponse(
        data,
        'rolePermission created',
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(target: string, id: number): Promise<void> {
    try {
      if (target === 'role_id') {
        const role = await this.findOne(id);
        if (!role) {
          throw new NotFoundException('Role not found');
        }
      }
      if (target === 'permission_id') {
        const allRoles = await this.findRolePermissions();
        const permission = await allRoles.find((role) =>
          role.permissions.includes(id),
        );
        if (!permission) {
          throw new NotFoundException('Permission not found');
        }
      }
      //   delete all entries on the corresponding target
      const data = await this.rolePermissionRepository
        .createQueryBuilder()
        .delete()
        .where(`${target} = :id`, { id })
        .execute();
      return this.responseHandlerService.successResponse(
        data,
        'rolePermission deleted',
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }
}
