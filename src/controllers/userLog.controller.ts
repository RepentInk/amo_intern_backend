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

@Controller('userLog')
export class UserLogController implements BasicController {

  constructor(private readonly userLogService: UserLogService) {}

  @Get()
  findAll(): Promise<UserLogDto[]> {
    return this.userLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.findOne(id);
  }

  @Post()
  create(@Body() userLogDto: UserLogDto): Promise<UserLogDto> {
    return this.userLogService.create(userLogDto);
  }

  @Put(':id')
  update(@Body() userLogDto: UserLogDto, @Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.update(userLogDto, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<UserLogDto> {
    return this.userLogService.delete(id);
  }
  
}
