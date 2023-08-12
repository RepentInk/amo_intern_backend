import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BasicController } from 'src/interfaces/controller.interface';
import { UserLogService } from 'src/services/userLog.service';
import { UserLogDto } from 'src/dto/userLog.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@Controller('userlogs')
@ApiTags('User Logs')
export class UserLogController implements BasicController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully retrieved all user logs.',
    type: UserLogDto,
    isArray: true,
  })
  async findAll(): Promise<UserLogDto[]> {
    return this.userLogService.findAll();
  }

  @Get(':id')
   @ApiParam({
     name: 'id',
     description: 'id of the userLog you are retrieving',
     type: Number,
     required: true,
     example: 7
   })
  @ApiOkResponse({
    description: 'Successfully retrieved the user log.',
    type: UserLogDto,
  })
  @ApiNotFoundResponse({ description: 'User log not found' })
  async findOne(@Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.findOne(id);
  }

  @Post()
  // @ApiParam({
  //   name: 'activity',
  //   description: 'the activity for the the userLog being created',
  //   type: String,
  //   required: true,
  // })
  // @ApiParam({
  //   name: 'user_id',
  //   description: 'the id of the user being created',
  //   type: Number,
  //   required: true,
  //   example: 8
  // })
  @ApiCreatedResponse({
    description: 'User log created successfully.',
    type: UserLogDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: UserLogDto,
    description: 'User log data to be created',
    required: true,
  })
  async create(@Body() userLogDto: UserLogDto): Promise<UserLogDto> {
    return this.userLogService.create(userLogDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the userLog you are updating',
    type: Number,
    required: true,
    example: 7
  })
  @ApiParam({
    name: 'activity',
    description: 'the activity for the the userLog being updated',
    type: String,
    required: false,
    example: 'Taking orders from customers'
  })
  @ApiParam({
    name: 'user_id',
    description: 'the id of the user being updated',
    type: Number,
    required: false,
    example: 6
  })
  @ApiOkResponse({
    description: 'User log updated successfully.',
    type: UserLogDto,
  })
  @ApiNotFoundResponse({ description: 'User log not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: UserLogDto,
    description: 'User log data to be updated',
    required: true,
  })
  async update(
    @Body() userLogDto: UserLogDto,
    @Param('id') id: number,
  ): Promise<UserLogDto> {
    return this.userLogService.update(userLogDto, id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'id of the userLog you are deleting',
    type: Number,
    required: true,
    example: 12
  })
  @ApiOkResponse({
    description: 'User log deleted successfully.',
    type: UserLogDto,
  })
  @ApiNotFoundResponse({ description: 'User log not found' })
  async delete(@Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.delete(id);
  }
}
