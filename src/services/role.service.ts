import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { PermissionService } from './permission.service';
import { RoleInterface } from 'src/interfaces/role.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
@Injectable()
export class RoleService implements RoleInterface {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<RoleDto>,
    private permissionService: PermissionService,
  ) {}

  async findAll(): Promise<RoleDto[]> {
    try {
      return this.roleRepository.find({ relations: { permissions: true } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<RoleDto> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: { permissions: true },
      });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      return role;
    } catch (error) {
      // this handles all the erros and send a responds to view
      throw new HttpException(error.message, error.status);
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
      // find each permission
      const permissions = await this.permissionService.findList(
        roleDto.permissions,
      );

      // assign list of permissions to role
      roleDto.permissions = [...roleDto.permissions, ...permissions];
      const role = await this.roleRepository.create(roleDto);
      return this.roleRepository.save(role);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(roleDto: RoleDto, id: number): Promise<RoleDto> {
    try {
      const role = await this.findOne(id);
      if (!role) {
        throw new NotFoundException('Role not found');
      }

      // get id for existion permissions and new permissions
      const updatedPermissionIds = roleDto.permissions.map((permission) => ({
        id: permission.id,
      }));
      const existingPermissionIds = role.permissions.map((permission) => ({
        id: permission.id,
      }));
      // find permissions to add
      // filter to return newly added permisions if any
      const permissionIds = updatedPermissionIds.filter(
        (permission) => !existingPermissionIds.includes(permission),
      );

      if (permissionIds.length <= 0) {
        // update with new properties
        await this.roleRepository.merge(role, roleDto);
        return await this.roleRepository.save(role);
      }

      const permissions = await this.permissionService.findList(permissionIds);

      // update with new properties
      await this.roleRepository.merge(role, roleDto);

      // Replace permissions and save
      role.permissions = permissions;
      return await this.roleRepository.save(role);
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
      throw new HttpException(error.message, error.status);
    }
  }
}
