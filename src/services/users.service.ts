import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';
import { UserInterface } from 'src/interfaces/users.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';

@Injectable()
export class UsersService implements UserInterface {

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<UserDto[]> {
    try {
      const users: any = await this.userRepository.find();
      const successMessage = 'Successful'
      return this.responseHandlerService.successResponse(successMessage, users);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error getting users';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<UserDto> {
    try {
      const user: any = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const successMessage = 'successful'
      return this.responseHandlerService.successResponse(successMessage, user);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error getting user';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async create(userDto: UserDto): Promise<UserDto> {
    try {
      const user: any = this.userRepository.create(userDto);
      const createUser = await this.userRepository.save(user);
      const successMessage = 'User successfully created'
      return this.responseHandlerService.successResponse(successMessage, createUser);
     
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error creating user';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(userDto: UserDto, id: number): Promise<UserDto> {
    try {
      const user: any = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      this.userRepository.merge(user, userDto);
      const updateUser = await this.userRepository.save(user);
      const successMessage = 'User updated successfully';
      return this.responseHandlerService.successResponse(successMessage, updateUser)

    } catch (error) {
      console.log(error);
      const errorMessage = 'Error updating user';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id: number): Promise<UserDto> {
    try {
      const user: any = await this.findOne(id);
      const deletedUser = await this.userRepository.remove(user);
      const successMessage = 'User deleted successfully'
      return this.responseHandlerService.successResponse(deletedUser, successMessage);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error deleting user';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR)
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
