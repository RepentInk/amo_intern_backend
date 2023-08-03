import { Injectable } from '@nestjs/common';
import { SettingDto } from 'src/dto/setting.dto';
import { Setting } from 'src/interfaces/setting.interface';
import { SmsService } from './sms.service';
@Injectable()
export class SettingService implements Setting {
  constructor(private readonly smsService: SmsService) {}
  findAll(): Promise<SettingDto[]> {
    throw new Error('Method not implemented.');
  }
  findOne(settingDto: SettingDto): Promise<SettingDto> {
    throw new Error('Method not implemented.');
  }
  create(settingDto: SettingDto): Promise<SettingDto> {
    throw new Error('Method not implemented.');
  }
  async update(settingDto: SettingDto, id: number): Promise<SettingDto> {
    const customerNumber = '+233546514388';
    const message = `Your order with ID ${id} is ready for pickup! Thank you for choosing us.`;
    await this.smsService.sendSms(customerNumber, message);
    throw new Error('Method not implemented.');
  }
  delete(settingDto: SettingDto): Promise<SettingDto> {
    throw new Error('Method not implemented.');
  }
}
