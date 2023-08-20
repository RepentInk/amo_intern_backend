import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { SmsInterface } from 'src/interfaces/sms.interface';
import { ConfigModule } from '@nestjs/config';
import { ResponseHandlerService } from './responseHandler.service';
import axios from 'axios';
ConfigModule.forRoot();

@Injectable()
export class SmsService implements SmsInterface {
  private readonly twilioClient: Twilio.Twilio;
  private readonly mnotifyKey = process.env.MNOTIFY_KEY;
  private readonly mnotifyEndpoint =
    'https://api.mnotify.com/api/sms/quick?key=';

  constructor(private readonly responseHandlerService: ResponseHandlerService) {
    this.twilioClient = Twilio(process.env.SMS_SID, process.env.SMS_TOKEN);
  }

  async twilioSms(phoneNumber: string, message: any): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        to: phoneNumber,
        from: process.env.VIRTUAL_NUMBER, // Replace with your Twilio phone number
        body: message,
      });
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async mnotifySms(phoneNumber: any, message: string): Promise<any> {
    const URL = this.mnotifyEndpoint + this.mnotifyKey;
    phoneNumber.typeOf() === 'array' ? null : (phoneNumber = [phoneNumber]);

    try {
      const data = {
        recipient: [...phoneNumber],
        sender: 'amo_tracker',
        message: message,
        is_schedule: 'false',
        schedule_date: '',
      };
      const response = await axios.post(URL, data, {
        headers: {
          Accept: 'application/json',
        },
      });

      return response;
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }
}
