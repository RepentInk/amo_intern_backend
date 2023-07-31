import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { UserDto } from 'src/dto/users.dto';
import { BasicController } from 'src/interfaces/controller.interface';

@Controller('users')
export class UsersController implements BasicController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.userService.findOne(id);
  }
  @Post('create')
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Put(':id')
  update(@Body() userDto: UserDto, @Param('id') id: number): Promise<any> {
    return this.userService.update(userDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
