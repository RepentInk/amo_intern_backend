import { ApiProperty } from '@nestjs/swagger';

export class PwdVerifyDto {
  @ApiProperty({
    name: 'phone_number',
    description: 'Users phone number',
    example: '+233204088090',
  })
  phone_number: string;
  @ApiProperty({
    name: 'verification_code',
    description: 'six digit verification code sent to user via sms',
    example: 188090,
  })
  verification_code: number;
  @ApiProperty({
    name: 'password',
    description: "user's new password",
    example: 'dsadlafe7wqDQdd',
  })
  password: string;
}
