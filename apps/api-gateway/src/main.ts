import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const port = process.env.port ?? 3000;
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  console.log(`✨ Aplicación NestJS ejecutándose en el puerto: ${port}`);
  console.log(`🔗 API Gateway disponible en: http://localhost:${port}/api`);
  await app.listen(port);
}
bootstrap();
