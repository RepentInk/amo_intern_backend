export interface SmsInterface {
  sendSms(customerNumber: string, message: any): Promise<any>;
}
