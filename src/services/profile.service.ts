import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { ProfileDto } from 'src/dto/profile.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/users.dto';

@Injectable()
export class ProfileService {
  Users: any;
  users: any;
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) { }

  async updateUserInfo(id: number, userProfile: ProfileDto): Promise<void> {
    const userExist: UserDto = this.users.find((user: UserDto) => user.id === id);

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.save(userProfile);
  }

  async updateUserPassword(id: number, userProfile: ProfileDto): Promise<void> {
    const user = this.users.find((user: ProfileDto) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (userProfile.password !== userProfile.confirm_password) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = bcrypt.hashSync(userProfile.password, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}
