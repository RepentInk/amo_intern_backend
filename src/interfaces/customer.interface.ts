export interface CustomerInterface {
  readonly id: number;
  name: string;
  phone_number: string;
  gender?: 'Male' | 'Female' | 'other';
  email?: string;
  organization?: string;
  created_at: Date;
  deleted_a?: Date;
}
