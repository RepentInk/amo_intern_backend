import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';
import { UserInterface } from 'src/interfaces/users.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements UserInterface {

  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) { }

  async findAll(): Promise<UserDto[]> {
    try {
      const users: any = await this.userRepository.find();
      const users: any = await this.userRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while fetching users');
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const role: any = await this.userRepository.findOneBy({ id });
      if (!role) {
        throw new NotFoundException('User not found');
      }

      return role;
    } catch (error) {
      console.log(error);
    }
  }

  async create(userDto: UserDto): Promise<UserDto> {
    try {
      const newUser: any = this.userRepository.create(userDto);
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async update(userDto: UserDto, id: number): Promise<UserDto> {
    try {
      const user: any = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      this.userRepository.merge(user, userDto);
      return this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id: number): Promise<Users> {
    try {
      const user: any = await this.findOne(id);
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

}
