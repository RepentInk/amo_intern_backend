import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
export class RoleDto {
  // @ApiProperty({
  //   example: 1,
  //   description: 'unique identifyer for the row of inpu',
  // })
  id: number;
  @ApiProperty({
    example: 'admin',
    description: 'access names given to users',
  })
  @MinLength(3)
  name: string;
  @ApiProperty({
    required: false,
    example: 'admin can create, view, update and delete all entities',
    description: 'description of functional ability of an access name',
  })
  description?: string;
  @ApiProperty({
    required: false,
    example: '[ 3 , 2 , 4]',
    description: 'list of permissions assigend to the role',
  })
  permissions?: any[];
  created_at?: Date;
  updated_at?: Date;
}
