// src/sms/sms.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsInterface } from 'src/interface/sms.interface';
import * as Twilio from 'twilio';
ConfigModule.forRoot();

@Injectable()
export class SmsService implements SmsInterface {
  constructor(private readonly twilioClient: Twilio.Twilio) {
    //Twilio credentials
    this.twilioClient = Twilio(process.env.SMS_SID, process.env.SMS_TOKEN);
  }

  async sendSms(customerNumber: string, message: string): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        to: customerNumber,
        from: process.env.VIRTUAL_NUMBER, //Twilio phone number
        body: message,
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }
};