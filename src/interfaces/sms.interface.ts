export interface SmsInterface {
  twilioSms(phoneNumber: string, message: any): Promise<any>;
  mnotifySms(phoneNumber: string[], message: any): Promise<any>;
}
