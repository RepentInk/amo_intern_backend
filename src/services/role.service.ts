import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { RoleInterface } from 'src/interfaces/role.interface';
import { Repository } from 'typeorm';
@Injectable()
export class RoleService implements RoleInterface {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    try {
      return this.roleRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({ where: { id } });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async create(roleDto: RoleDto): Promise<Role> {
    try {
      const newRole = this.roleRepository.create(roleDto);
      return this.roleRepository.save(newRole);
    } catch (error) {
      console.log(error);
    }
  }

  async update(roleDto: RoleDto, id: number): Promise<Role> {
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

  async delete(id: number): Promise<Role> {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.remove(role);
      return role;
    } catch (error) {
      console.log(error);
    }
  }
}
