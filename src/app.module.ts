import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CustomerModule } from './customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
