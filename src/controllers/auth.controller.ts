import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService, TokenBlacklistService } from '../services/auth.service';
import { LoginDto } from '../dto/auth.dto';
import { PwdVerifyDto } from '../dto/pwd.verify.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UserDto } from 'src/dto/users.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Users email',
    type: String,
    example: 'calvinasty@example.com',
  })
  @ApiParam({
    name: 'password',
    required: true,
    description: 'Users password',
    type: String,
    example: '@examplE123',
  })
  @ApiOkResponse({ description: 'User logged in successfully.', type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({ type: LoginDto, description: 'User login credentials' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  // password reset verification
  @Post('forgot-password')
  @ApiParam({
    name: 'phone_number',
    required: true,
    description: 'Users phone number',
    type: String,
    example: '+233204088090',
  })
  async sendVerificationCode(
    @Body() body: { phone_number: string },
  ): Promise<any> {
    const user = await this.authService.sendVerificationCode(body.phone_number);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Verification code sent successfully' };
  }

  @ApiTags('Password Reset')
  @Post('reset-password/submit-verification-code')
  async submitVerificationCode(@Body() pwdVerifyDto: PwdVerifyDto) {
    return this.authService.submitVerificationCode(pwdVerifyDto);
  }
}
