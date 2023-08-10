import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
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

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    if(user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.name, email: user.email };
    const token = await this.jwtService.signAsync(payload, {secret: process.env.JWT_CONSTANT});
    return token;
  }
}
