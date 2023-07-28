import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class PermissionDto {
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  display_name: string;

  @IsDate()
  created_at?: Date;
  updated_at?: Date;
}
