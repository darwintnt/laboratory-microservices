import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('API-GATEWAY');
  const port = process.env.port ?? 3000;
  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  logger.log(`✨ Aplicación NestJS ejecutándose en el puerto: ${port}`);
  logger.log(`🔗 API Gateway disponible en: http://localhost:${port}/api`);

  await app.listen(port);
}
bootstrap();
