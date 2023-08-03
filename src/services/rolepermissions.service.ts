import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionDto } from 'src/dto/rolepermissions.dto';
import { RolePermission } from 'src/entities/rolepermssion.entity';
import { RolePermissionInterface } from 'src/interfaces/rolepermission.interface';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionService implements RolePermissionInterface {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<RolePermissionDto[]> {
    try {
      const permissions: any = await this.rolePermissionRepository.find();
      return permissions;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<RolePermissionDto> {
    try {
      const rolePermission: any = await this.rolePermissionRepository.findOneBy(
        { id },
      );

      if (!rolePermission) {
        throw new NotFoundException('RolePermsission not found');
      }

      return rolePermission;
    } catch (error) {
      console.log(error);
    }
  }

  async create(
    rolePermissionDto: RolePermissionDto,
  ): Promise<RolePermissionDto> {
    try {
      const newRolePermission =
        this.rolePermissionRepository.create(rolePermissionDto);
      return this.rolePermissionRepository.save(newRolePermission);
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    rolePermissionDto: RolePermissionDto,
    id: number,
  ): Promise<RolePermission> {
    try {
      const rolePermission: any = await this.findOne(id);
      if (!rolePermission) {
        throw new NotFoundException('RolePermsission not found');
      }
      this.rolePermissionRepository.merge(rolePermission, rolePermissionDto);
      return this.rolePermissionRepository.save(rolePermission);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<RolePermissionDto> {
    try {
      const rolePermission: any = await this.findOne(id);
      await this.rolePermissionRepository.remove(rolePermission);
      return rolePermission;
    } catch (error) {
      console.log(error);
    }
  }
}
