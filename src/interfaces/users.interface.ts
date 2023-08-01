import { UserDto } from 'src/dto/users.dto';
import { Users } from 'src/entities/users.entity';

export interface UserInterface {
  findAll(): Promise<UserDto[]>;
  findOne(id: number): Promise<UserDto>;
  create(UserDto: UserDto): Promise<UserDto>;
  update(UserDto: UserDto, id: number): Promise<UserDto>;
  delete(id: number): Promise<UserDto>;
}
