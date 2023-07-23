import { Module } from '@nestjs/common';
import { UserLogService } from './userLog.service';

@Module({
  providers: [UserLogService],
})
export class UserLogModule {}
