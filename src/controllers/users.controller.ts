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
  ApiParam,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController implements BasicController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all users.',
    type: UserDto,
    isArray: false,
  })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter id of the user',
    type: Number,
    example: 2,
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the user.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiParam({
    name: 'name',
    required: true,
    description: 'full name of the user being created',
    type: String,
    example: 'John Doe'
  })
  @ApiParam({
    name: 'email',
    required: true,
    description: 'email of the user being created',
    type: String,
    example: 'johndoe@gmail.com'
  })
  @ApiParam({
    name: 'phone_number',
    required: true,
    description: 'phone number of the user being created',
    type: String,
    example: '+2332456789'
  })
  @ApiParam({
    name: 'role_id',
    description: 'The role id the user belongs to',
    type: Number,
    required: true,
    example: 4
  })
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
  @ApiParam({
    name: 'id',
    description: 'id of the user to be updated',
    type: Number,
    required: true,
    example: 3
  })
  @ApiParam({
    name: 'name',
    required: false,
    description: 'full name of the user to be updated ',
    type: String,
    example: 'Mark Doe'
  })
  @ApiParam({
    name: 'email',
    required: false,
    description: 'email of the user to be updated',
    type: String,
    example: 'johndoe@gmail.com'
  })
  @ApiParam({
    name: 'phone_number',
    required: false,
    description: 'Phone number of the user to be updated',
    type: String,
    example: '+2332456453'
  })
  @ApiParam({
    name: 'role_id',
    description: 'role id the user belongs to',
    type: Number,
    required: false,
    example: 2
  })
  @ApiOkResponse({
    description: 'User updated successfully.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: UserDto,
    description: 'User data to be updated',
    required: false,
  })
  async update(
    @Body() userDto: UserDto,
    @Param('id') id: number,
  ): Promise<UserDto> {
    return this.userService.update(userDto, id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the user to be deleted',
    type: Number,
    required: true,
    example: 3
  })
  @ApiOkResponse({
    description: 'User deleted successfully.',
    type: UserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id') id: number): Promise<UserDto> {
    return this.userService.delete(id);
  }
}
