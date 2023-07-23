import { Injectable } from '@nestjs/common';

interface UserLog {
  id: number;
  user_id: number;
  action: string;
  model: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

@Injectable()
export class UserLogService {
  private userLogs: UserLog[] = [];

  logUserActivity(user_id: number, action: string, model: string): string {
    const userLog: UserLog = {
      id: this.userLogs.length + 1,
      user_id,
      action,
      model,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    this.userLogs.push(userLog);

    const message = `User ${user_id} ${action} ${model}`;

    return message;
  }
}
