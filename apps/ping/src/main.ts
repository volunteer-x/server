import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get('PING_PORT');

  await app.listen(port);

  console.log('🚀 Ping server running successfully on port:', port);
}
bootstrap();
