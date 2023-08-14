import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { compare, hash } from 'bcrypt';
import { SmsService } from './sms.service';
import { PwdVerifyDto } from '../dto/pwd.verify.dto';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly smsService: SmsService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && (await compare(password, user.password))) {
      const { name, email, phone_number } = user;
      const role = user.role.name;
      const permissions = user.role.permissions.map(
        (permission) => permission.name,
      );

      return { name, email, phone_number, role, permissions };
    }

    return null;
  }

  // send pwd_code
  async sendVerificationCode(phone_number: string) {
    const user = await this.userService.findByPhoneNumber(phone_number);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate a random 6-digit pwd code
    const pwd_code = Math.floor(100000 + Math.random() * 900000);

    // Send the pwd code via SMS
    await this.smsService.sendSms(user.phone_number, pwd_code);

    // Update user's pwdCode and pwdCodeExpiredAt in the database
    const pwd_expired_at = new Date();
    pwd_expired_at.setMinutes(pwd_expired_at.getMinutes() + 10); // 10 minutes from now
    user.pwd_code = pwd_code;
    user.pwd_expired_at = pwd_expired_at;
    return await this.userService.update(user, user.id);

    // return { message: 'Verification code sent successfully' };
  }

  // verify pwd_code and update password
  async submitVerificationCode(pwdVerifyDto: PwdVerifyDto) {
    const user = await this.userService.findByPhoneNumber(
      pwdVerifyDto.phone_number,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      user.pwd_code !== pwdVerifyDto.verification_code ||
      user.pwd_expired_at < new Date()
    ) {
      throw new BadRequestException('Invalid verification code or expired');
    }

    // Update user's password and clear verification code
    const hasedPasword = await hash(
      pwdVerifyDto.password,
      process.env.BCRYPT_SALT_ROUNDS,
    );
    user.password = hasedPasword;
    user.pwd_code = null
    user.pwd_expired_at = null

    return await this.userService.update(user, user.id);
    // return { message: 'Password updated successfully' };
  }
}
