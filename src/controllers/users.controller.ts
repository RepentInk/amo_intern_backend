import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from 'src/dto/users.dto';
import { UserInterface } from 'src/interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): UserInterface[] {
    try {
      return this.usersService.getAllUsers();
    } catch (error) {
      return error;
    }
  } // To get all users in the database

  @Get(':id')
  getOneUser(@Param('id') id: number): UserInterface {
    try {
      return this.usersService.getOneUser(id);
    } catch (error) {
      return error;
    }
  } // To get one user that exist in the database

  @Post('create')
  createUser(@Body() newUsers: User) {
    return this.usersService.createUser(newUsers);
  } // To create a user

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() editUsers: User) {
    try {
      return this.usersService.updateUser(id, editUsers);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
