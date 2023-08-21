import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserLogDto {
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsDate()
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
