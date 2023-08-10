import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../dto/auth.dto';
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
}
