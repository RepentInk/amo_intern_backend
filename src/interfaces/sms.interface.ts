export interface SmsInterface {
  sendSms(customerNumber: string, message: string): Promise<any>;
}
