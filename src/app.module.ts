import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/categories.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class AppModule {}
