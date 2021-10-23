import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggingService));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
