import { Injectable } from "@nestjs/common";
import { SettingDto } from "src/dto/setting.dto";
import { Setting } from "src/interfaces/setting.interface";

@Injectable()
export class SettingService implements Setting {
    
    findAll(): Promise<SettingDto> {
        throw new Error("Method not implemented.");
    }
    findOne(settingDto: SettingDto): Promise<SettingDto> {
        throw new Error("Method not implemented.");
    }
    create(settingDto: SettingDto): Promise<SettingDto> {
        throw new Error("Method not implemented.");
    }
    update(settingDto: SettingDto, id: number): Promise<SettingDto> {
        throw new Error("Method not implemented.");
    }
    delete(settingDto: SettingDto): Promise<SettingDto> {
        throw new Error("Method not implemented.");
    }
}