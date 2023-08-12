import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { ProfileDto } from 'src/dto/profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  Users: any;
  users: any;
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async updateUserInfo(
    id: number,
    newData: { name?: string; email?: string; phone_number?: string },
  ): Promise<void> {
    const user = this.users.find((u: { id: number }) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (newData.name) {
      user.name = newData.name;
    }

    if (newData.email) {
      user.email = newData.email;
    }

    if (newData.phone_number) {
      user.phone_number = newData.phone_number;
    }

    await this.userRepository.save(user);
  }

  async updateUserPassword(
    id: number,
    password: string,
    confirm_password: string,
  ): Promise<void> {
    const user = this.users.find((u: { id: number }) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password !== confirm_password) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}
