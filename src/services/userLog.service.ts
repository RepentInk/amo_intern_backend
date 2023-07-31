import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogDto } from 'src/dto/userLog.dto';
import { UserLog } from 'src/entities/userLog.entities';
import { UserLogInterface } from 'src/interfaces/userLog.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserLogService implements UserLogInterface {
  
  constructor(@InjectRepository(UserLog) private userLogRepository: Repository<UserLog>) {}

  async findAll(): Promise<UserLogDto[]> {
    try {
      const userLogs: UserLogDto[] = await this.userLogRepository.find();

      return userLogs;
    } catch (error) {
      console.log(error);
      throw new Error('An error occurred while fetching user logs');
    }
  }

  async findOne(id: number): Promise<UserLogDto> {
    try {
      const userLog: UserLogDto = await this.userLogRepository.findOneBy({ id });
      if (!userLog) {
        throw new NotFoundException('UserLog not found');
      }

      return userLog;
    } catch (error) {
      console.log(error);
    }
  }

  async create(userLogDto: UserLogDto): Promise<UserLogDto> {
    try {
      const newUserLog: UserLogDto = this.userLogRepository.create(userLogDto);
      return this.userLogRepository.save(newUserLog);
    } catch (error) {
      console.log(error);
    }
  }

  async update(userLogDto: UserLogDto, id: number): Promise<UserLogDto> {
    try {
      const userLog: any = await this.findOne(id);
      if (!userLog) {
        throw new NotFoundException('UserLog not found!');
      }
      this.userLogRepository.merge(userLog, userLogDto);
      return this.userLogRepository.save(userLog);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<UserLogDto> {
    try {
      const userLog = await this.userLogRepository.findOneBy({ id });
      if (!userLog) {
        throw new NotFoundException('UserLog not found');
      }
      await this.userLogRepository.remove(userLog);
      return userLog;
    } catch (error) {
      console.log(error);
    }
  }
}
