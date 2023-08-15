export interface SmsInterface {
  sendSms(customer_number: string, message: any): Promise<any>;
}
