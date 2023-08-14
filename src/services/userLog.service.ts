import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogDto } from 'src/dto/userLog.dto';
import { UserLog } from 'src/entities/userLog.entities';
import { UserLogInterface } from 'src/interfaces/userLog.interface';
import { Repository } from 'typeorm';
import { ResponseHandlerService } from './responseHandler.service';

@Injectable()
export class UserLogService implements UserLogInterface {
  constructor(
    @InjectRepository(UserLog) private userLogRepository: Repository<UserLog>,
    private readonly responseHandlerService: ResponseHandlerService,
  ) {}

  async findAll(): Promise<UserLogDto[]> {
    try {
      const userLogs: any = await this.userLogRepository.find();
      const successMessage = 'Successful';
      return this.responseHandlerService.successResponse(successMessage, userLogs);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error getting user logs';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
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
      return this.responseHandlerService.successResponse(successMessage, userLog);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error getting user log';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(userLogDto: UserLogDto): Promise<UserLogDto> {
    try {
      const userLog: any = this.userLogRepository.create(userLogDto);
      const createdUserLog = await this.userLogRepository.save(userLog);
      const successMessage = 'User log created successfully';
      return this.responseHandlerService.successResponse(successMessage, createdUserLog);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error creating user log';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userLogDto: UserLogDto, id: number): Promise<UserLogDto> {
    try {
      const userLog: any = await this.userLogRepository.findOne({
        where: { id },
      });
      if (!userLog) {
        throw new NotFoundException('UserLog not found');
      }
      this.userLogRepository.merge(userLog, userLogDto);
      const updateUserLog = await this.userLogRepository.save(userLog);
      const successMessage = 'Usr log updated successfully';
      return this.responseHandlerService.successResponse(successMessage, updateUserLog)
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error updating user log';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
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
      return this.responseHandlerService.successResponse(deletedUserLog, successMessage);
    } catch (error) {
      console.log(error);
      const errorMessage = 'Error deleting user log';
      throw this.responseHandlerService.errorResponse(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
