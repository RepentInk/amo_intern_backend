import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { SmsInterface } from 'src/interfaces/sms.interface';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Injectable()
export class SmsService implements SmsInterface {
 
  private readonly twilioClient: Twilio.Twilio;
  
  constructor() {
    this.twilioClient = Twilio(process.env.SMS_SID, process.env.SMS_TOKEN);
  }

  async sendSms(customerNumber: string, message: any): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        to: customerNumber,
        from: process.env.VIRTUAL_NUMBER, // Replace with your Twilio phone number
        body: message,
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }

}
