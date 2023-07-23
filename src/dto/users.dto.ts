export class User {
  readonly id: number;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  role_id: number;
  verified: boolean;
  pwd_expired_at: Date;
  pwd_code: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  //Properties for Users
}
