import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class PermissionDto {
  @ApiProperty({
    example: 1,
    description: 'unique identifyer for the row of input',
  })
  id: number;
  @ApiProperty({
    example: 'create_order',
    description: 'name given to a user fuctionality',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'create order',
    description: 'readble functionaly name for users ',
  })
  display_name: string;

  @IsDate()
  created_at?: Date;
  updated_at?: Date;
}
