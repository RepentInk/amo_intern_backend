import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';
import { UserInterface } from 'src/interfaces/users.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService implements UserInterface {

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    try {
      const users: any = await this.userRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while fetching users');
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const user: any = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async create(userDto: UserDto): Promise<UserDto> {
    try {
      const user: any = this.userRepository.create(userDto);
      return this.userRepository.save(user);
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

  async delete(id: number): Promise<UserDto> {
    try {
      const user: any = await this.findOne(id);
      await this.userRepository.remove(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string): Promise<Users> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByPhoneNumber(phone_number: string): Promise<any> {
    return await this.userRepository.findOne({
      where: { phone_number },
    });
  }
}
