import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger setup
  setupSwagger(app);
  await app.listen(8001);
}
bootstrap();
