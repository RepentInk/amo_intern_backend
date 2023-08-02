// src/sms/sms.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Twilio from 'twilio';

@Injectable()
export class SmsService  {
  private readonly twilioClient: Twilio.Twilio;

  constructor() {
    // Replace YOUR_ACCOUNT_SID and YOUR_AUTH_TOKEN with your Twilio credentials
    this.twilioClient = Twilio(YOUR_ACCOUNT_SID, YOUR_AUTH_TOKEN);
  }

  async sendSms(phoneNumber: string, message: string): Promise<void> {
    try {
      await this.twilioClient.messages.create({
        to: phoneNumber,
        from: 'YOUR_TWILIO_PHONE_NUMBER', // Replace with your Twilio phone number
        body: message,
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send SMS');
    }
  }
}