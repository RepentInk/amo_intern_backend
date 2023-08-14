import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { RoleInterface } from 'src/interfaces/role.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
@Injectable()
export class RoleService implements RoleInterface {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<RoleDto>,
  ) {}

  async findAll(): Promise<RoleDto[]> {
    try {
      return this.roleRepository.find({ relations: { permissions: true } });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<RoleDto | NonNullable<>> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: { permissions: true },
      });
      if (!role) {
        return new NotFoundException('Role not found');
      }
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async create(roleDto: RoleDto): Promise<RoleDto> {
    try {
      const roleExit = this.roleRepository.findOne({
        where: { name: roleDto.name },
      });
      if (roleExit) {
        throw new ConflictException('role already exists')
      }
      const newRole = this.roleRepository.create(roleDto);
      return this.roleRepository.save(newRole);
    } catch (error) {
      console.log(error);
    }
  }

  async update(roleDto: RoleDto, id: number): Promise<RoleDto> {
    try {
      const role = await this.findOne(id);
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      this.roleRepository.merge(role, roleDto);
      return this.roleRepository.save(role);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<RoleDto> {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.remove(role);
      return role;
    } catch (error) {
      console.log(error);
    }
  }
}
