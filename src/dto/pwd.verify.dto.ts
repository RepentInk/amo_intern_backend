import { ApiProperty } from '@nestjs/swagger';

export class PwdVerifyDto {
   @ApiProperty({
    name: 'phoneNumber',
    description: 'Users phone number',
    example: '+233204088090',
  })
  phoneNumber: string;
  @ApiProperty({
    name: 'verificationCode',
    description: 'six digit verification code sent to user via sms',
    example: 188090,
  })
  verificationCode: number;
  @ApiProperty({
    name: 'newPassword',
    description: "user's new password",
    example: 'dsadlafe7wqDQdd',
  })
  newPassword: string;
}
