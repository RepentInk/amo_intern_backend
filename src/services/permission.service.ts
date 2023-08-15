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
      throw new HttpException(error.message, error.status);
    }
  }
  // for test purposes only
  async findList(permissionIds: any[]): Promise<any[]> {
    try {
      // find each permission
      const permissions = await this.permissionRepository.find({
        where: [...permissionIds],
      });
      if (!permissions || permissions.length !== permissionIds.length) {
        throw new NotFoundException('One or More Permissions not found');
      }
      return permissions;
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
      throw new HttpException(error.message, error.status);
    }
  }

  async create(permissionDto: PermissionDto): Promise<PermissionDto> {
    try {
      const permissionExit = await this.permissionRepository.findOne({
        where: { name: permissionDto.name },
      });
      if (permissionExit) {
        console.log(permissionExit);
        throw new ConflictException('permission already exists');
      }
      const permission = await this.permissionRepository.create(permissionDto);
      return this.permissionRepository.save(permission);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
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
      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number): Promise<PermissionDto> {
    try {
      const permission: any = await this.findOne(id);
      await this.permissionRepository.remove(permission);
      return permission;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
