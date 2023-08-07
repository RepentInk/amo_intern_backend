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
} from '@nestjs/swagger';

@Controller('userLog')
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
  @ApiOkResponse({
    description: 'Successfully retrieved the user log.',
    type: UserLogDto,
  })
  @ApiNotFoundResponse({ description: 'User log not found' })
  async findOne(@Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.findOne(id);
  }

  @Post()
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
  @ApiOkResponse({
    description: 'User log deleted successfully.',
    type: UserLogDto,
  })
  @ApiNotFoundResponse({ description: 'User log not found' })
  async delete(@Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.delete(id);
  }
}
