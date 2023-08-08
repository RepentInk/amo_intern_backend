import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService as UserService } from '../services/users.service';
import { UserDto } from 'src/dto/users.dto';
import { BasicController } from 'src/interfaces/controller.interface';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController implements BasicController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all users.',
    type: UserDto,
    isArray: true,
  })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully retrieved the user.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Post('create')
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: UserDto,
    description: 'User data to be created',
    required: true,
  })
  async create(@Body() userDto: UserDto): Promise<UserDto> {
    return this.userService.create(userDto);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'User updated successfully.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: UserDto,
    description: 'User data to be updated',
    required: true,
  })
  async update(
    @Body() userDto: UserDto,
    @Param('id') id: number,
  ): Promise<UserDto> {
    return this.userService.update(userDto, id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted successfully.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id') id: number): Promise<UserDto> {
    return this.userService.delete(id);
  }
}
