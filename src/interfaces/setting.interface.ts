import { SettingDto } from 'src/dto/setting.dto';

export interface Setting {
  findAll(): Promise<SettingDto[]>;

  findOne(settingDto: SettingDto): Promise<SettingDto>;

  create(settingDto: SettingDto): Promise<SettingDto>;

  update(settingDto: SettingDto, id: number): Promise<SettingDto>;

  delete(settingDto: SettingDto): Promise<SettingDto>;
}
