import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { PermissionService } from './permission.service';
import { RolePermissionService } from './rolePermission.service';
import { RoleInterface } from 'src/interfaces/role.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
@Injectable()
export class RoleService implements RoleInterface {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<RoleDto>,
    private readonly permissionService: PermissionService,
    private readonly rolePermissionService: RolePermissionService,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findRolesWithPermissions(rolePermissionIds: any[]): Promise<any[]> {
    //
    const rolesWithPermissions = await Promise.all(
      rolePermissionIds.map(async (item) => {
        const role = await this.roleRepository.findOne({
          where: { id: item.role_id },
        });
        const permissions = await this.permissionService.findByIds(
          item.permissions,
        );
        return {
          role: role,
          permissions: permissions,
        };
      }),
    );
    // sort out reuslt in accesible array of object
    const final = await rolesWithPermissions.map((item) => ({
      ...item.role,
      permissions: item.permissions['data'],
    }));
    return final;
  }
  async findAll(): Promise<RoleDto[]> {
    try {
      //all roles with corresponding permission ids
      const rolesWithPermissionIds =
        await this.rolePermissionService.findRolePermissions();
      const data = await this.findRolesWithPermissions(rolesWithPermissionIds);
      return this.responseHandlerService.successResponse(data);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async findOne(id: number): Promise<RoleDto> {
    try {
      const roleWithPermissionId = await this.rolePermissionService.findOne(id);
      const role = await this.findRolesWithPermissions([roleWithPermissionId]);
      return this.responseHandlerService.successResponse(role);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async create(roleDto: RoleDto): Promise<RoleDto> {
    try {
      // check if role exists
      const roleExit = await this.roleRepository.findOne({
        where: { name: roleDto.name },
      });
      if (roleExit) {
        throw new ConflictException('role already exists');
      }
      // create new role
      const result = await this.roleRepository.create({
        name: roleDto.name,
        description: roleDto.description,
      });
      const role = await this.roleRepository.save(result);
      //get role_permission table data
      const rolePermissionData = {
        role_id: role.id,
        permissions: roleDto.permissions,
      };
      // find each permission information
      const permissions = await this.permissionService.findByIds(
        roleDto.permissions,
      );
      roleDto = { ...role };
      roleDto.permissions = permissions['data'];
      //insert relatioship in role_permission table
      await this.rolePermissionService.create(rolePermissionData);
      return this.responseHandlerService.successResponse(role);
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }

  async update(roleDto: RoleDto, id: number): Promise<RoleDto> {
    try {
      const roleExist = await this.findOne(id);
      if (!roleExist) {
        throw new NotFoundException('Role not found');
      }
      const role = roleExist['data'][0];
      const permissionIds = roleDto.permissions;
      const permissions = await this.permissionService.findByIds(permissionIds);

      // update with new properties
      const mergedRole = await this.roleRepository.merge(role, roleDto);

      const data = await this.roleRepository.save({
        id: mergedRole.id,
        name: mergedRole.name,
        description: mergedRole.description,
      });

      // delete old rolePermission relationships
      await this.rolePermissionService.delete('role_id', mergedRole.id);
      // insert new role_permission relationships
      await this.rolePermissionService.create({
        role_id: role.id,
        permissions: permissionIds,
      });

      // Replace permissions and save
      role.permissions = permissions['data'];

      return this.responseHandlerService.successResponse(role);
      // return await this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number): Promise<RoleDto> {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.remove(role);
      return role;
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
      );
    }
  }
}
