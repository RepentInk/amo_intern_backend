import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/dto/users.dto';
import { ProfileDto } from 'src/dto/profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  private users: UserDto[] = [];
  //change username
  async updateUserName(
    id: number,
    newName: string,
    password: string,
  ): Promise<void> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid password');
    }

    user.name = newName;
  }
  //change email
  async updateUserEmail(
    id: number,
    newEmail: string,
    password: string,
  ): Promise<void> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid password');
    }

    user.email = newEmail;
  }
  //change phone number
  async updateUserPhoneNumber(
    id: number,
    newPhoneNumber: string,
    password: string,
  ): Promise<void> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid password');
    }

    user.phone_number = newPhoneNumber;
  }
  //update password
  async updateUserPassword(
    id: number,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<void> {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw new Error('Invalid old password');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
  }
}
