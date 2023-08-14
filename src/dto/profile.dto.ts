import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  readonly id: number;
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'newpassword123', description: 'New password' })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: '1234567890', description: 'User phone number' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;
  //properties to aid pasword change
  confirm_password: string;
}
