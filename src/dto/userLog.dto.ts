import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserLog {
  @IsNumber()
  id: number;
  user_id: number;

  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsDate()
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
