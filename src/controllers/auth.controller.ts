import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Req,
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
  @ApiTags('Password Reset')
  @Post('reset-pssword/send-verification-code')
  @ApiParam({
    name: 'phoneNumber',
    required: true,
    description: 'Users phone number',
    type: String,
    example: '+233204088090',
  })
  async sendVerificationCode(
    @Body() body: { phoneNumber: string },
  ): Promise<any> {
    const user = await this.authService.sendVerificationCode(body.phoneNumber);
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

@Controller('logout')
@ApiTags('Logout')
export class LogoutController {
  constructor(private readonly tokenBlacklistService: TokenBlacklistService) {}
  @ApiParam({
    name: 'token',
    required: true,
    description: 'Users token',
    type: String,
    example: 'bfhhgut.j944843ndh.345jhg83',
  })
  @UseGuards()
  @Post()
  async logout(@Req() req: Request): Promise<void> {
    const token = req.headers.authorization.split(' ')[1];
    await this.tokenBlacklistService.addToBlacklist(token);
  }
}
