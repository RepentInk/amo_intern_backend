import { Injectable, NotFoundException } from '@nestjs/common';
import { PermissionInterface } from 'src/interfaces/permission.interface';
import { PermissionDto } from 'src/dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService implements PermissionInterface {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<PermissionDto[]> {
    try {
      return this.permissionRepository.find();
    } catch (error) {
      console.log(error);
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
      return permission;
    } catch (error) {
      console.log(error);
    }
  }

  async create(permissionDto: PermissionDto): Promise<PermissionDto> {
    try {
      const newPermission = this.permissionRepository.create(permissionDto);
      return this.permissionRepository.save(newPermission);
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    permissionDto: PermissionDto,
    id: number,
  ): Promise<PermissionDto> {
    try {
      const permission: any = await this.findOne(id);
      if (!permission) {
        throw new NotFoundException('Permission not found');
      }
      this.permissionRepository.merge(permission, permissionDto);
      return this.permissionRepository.save(permission);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<PermissionDto> {
    try {
      const permission: any = await this.findOne(id);
      await this.permissionRepository.remove(permission);
      return permission;
    } catch (error) {
      console.log(error);
    }
  }
}
