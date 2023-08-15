import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id: number;
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  phone_number: string;

  role_id: number;
  verified: boolean;
  pwd_expired_at: Date;
  pwd_code: number;

  @IsDate()
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
