import { Module } from '@nestjs/common';
// import { AppController } from './controllers/app.controller';
import { UsersController } from './controllers/users.controller';
// import { AppService } from './services/app.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
