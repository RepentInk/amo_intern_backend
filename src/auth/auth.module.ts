import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/services/users.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1hr'}
    }),
  ],
  providers: [AuthService, UsersService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
