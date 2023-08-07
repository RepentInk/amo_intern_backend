import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {}

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
}
