import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogDto } from 'src/dto/userLog.dto';
import { UserLog } from 'src/entities/userLog.entities';
import { UserLogInterface } from 'src/interfaces/userLog.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
const successMessage = 'Successful';

@Injectable()
export class UserLogService implements UserLogInterface {
  constructor(
    @InjectRepository(UserLog) private userLogRepository: Repository<UserLog>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}
  update(userLogDto: UserLogDto, id: number): Promise<UserLogDto> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<UserLogDto[]> {
    try {
      const userLogs: any = await this.userLogRepository.find();
      return this.responseHandlerService.successResponse(
        successMessage,
        userLogs,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async findOne(id: number): Promise<UserLogDto> {
    try {
      const userLog: any = await this.userLogRepository.findOne({
        where: { id },
      });
      if (!userLog) {
        throw new NotFoundException('UserLog not found');
      }
      const successMessage = 'Successful';
      return this.responseHandlerService.successResponse(
        successMessage,
        userLog,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async create(userLogDto: UserLogDto): Promise<UserLogDto> {
    try {
      const userLog = new UserLog();
      userLog.user_id = userLogDto.user_id;
      userLog.activity = userLogDto.activity;
      userLog.model = userLogDto.model;
      userLog.created_at = new Date();

      const createdUserlog = await this.userLogRepository.save(userLog);
      return this.responseHandlerService.successResponse(
        createdUserlog,
        successMessage,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error.message,
        error.status,
        error,
      );
    }
  }

  async delete(id: number): Promise<UserLogDto> {
    try {
      const userLog: any = await this.userLogRepository.findOne({
        where: { id },
      });
      if (!userLog) {
        throw new NotFoundException('UserLog not found');
      }
      const deletedUserLog = await this.userLogRepository.remove(userLog);
      const successMessage = 'User log deleted successfully';
      return this.responseHandlerService.successResponse(
        deletedUserLog,
        successMessage,
      );
    } catch (error) {
      throw this.responseHandlerService.errorResponse(
        error,
        error.status,
        error.message,
      );
    }
  }
}
