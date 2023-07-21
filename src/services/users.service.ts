import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/interfaces/users.interface';
import { User } from 'src/dto/users.dto';

@Injectable()
export class UsersService {
  private users = [];

  getAllUsers(): UserInterface[] {
    return this.users;
  }

  getOneUser(id: number): UserInterface {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  createUser(newUser: User): User {
    const id = Math.floor(Math.random() * 100);
    this.users.push({ id, ...newUser });
    return this.getOneUser(id);
  }

  updateUser(id: number, editUsers: User) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return { ...user, ...editUsers };
      }
      return user;
    });
    return this.getOneUser(id);
  }

  deleteUser(id: number): string {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    this.users = this.users.filter((user) => user.id !== id);
    return 'Deleted';
  }
}
