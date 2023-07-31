import { UserLogDto } from 'src/dto/userLog.dto';

export interface UserLogInterface {
  findAll(): Promise<UserLogDto[]>;
  findOne(id: number): Promise<UserLogDto>;
  create(userLogDto: UserLogDto): Promise<UserLogDto>;
  update(userLogDto: UserLogDto, id: number): Promise<UserLogDto>;
  delete(id: number): Promise<UserLogDto>;
}
