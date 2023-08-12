import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { SettingDto } from 'src/dto/setting.dto';
import { BasicController } from 'src/interfaces/controller.interface';
import { SettingService } from 'src/services/setting.service';
import {
  PermissionGuard,
  Permissions,
} from 'src/services/permission.guard.service';
@Controller('settings')
export class SettingController implements BasicController {
  constructor(
    private settingService: SettingService,
    private readonly permissionGuard: PermissionGuard,
  ) {}

  @Get('get-one')
  @UseGuards(PermissionGuard) //use permission guard middlewrae  
  @Permissions('findone-setting') // Define the required permissions using the custom Permission decorator
  findOne(id: number): Promise<SettingDto> {
    throw new Error('Method not implemented.');
  }

  update(settingDto: SettingDto, id: number): Promise<SettingDto> {
    throw new Error('Method not implemented.');
  }

  delete(settingDto: SettingDto): Promise<SettingDto> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<SettingDto[]> {
    return this.settingService.findAll();
  }

  create(@Body() settingDto: SettingDto): Promise<SettingDto> {
    return this.settingService.create(settingDto);
  }
}
