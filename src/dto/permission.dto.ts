import { IsString, IsNotEmpty } from 'class-validator';

export class PermissionDto {
  readonly id: number;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  display_name: string;
  
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
