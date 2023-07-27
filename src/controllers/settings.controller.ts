import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { SettingDto } from "src/dto/setting.dto";
import { BasicController } from "src/interfaces/controller.interface";
import { SettingService } from "src/services/setting.service";

@Controller('settings')
export class SettingController implements BasicController {
    
    constructor(private settingService: SettingService) {}

    findOne(id: number): Promise<SettingDto> {
        throw new Error('Method not implemented.');
    }

    update(settingDto: SettingDto, id: number): Promise<SettingDto> {
        throw new Error('Method not implemented.');
    }

    delete(settingDto: SettingDto): Promise<SettingDto> {
        throw new Error('Method not implemented.');
    }

    findAll(): Promise<SettingDto> {
        return this.settingService.findAll();
    }

    create(@Body() settingDto: SettingDto): Promise<SettingDto> {
        return this.settingService.create(settingDto);
    }

    
}