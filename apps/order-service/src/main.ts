import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('ORDER-SERVICE');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'order_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();

  logger.log(`🚀 Order Service Application is listening...`);
}
bootstrap();
