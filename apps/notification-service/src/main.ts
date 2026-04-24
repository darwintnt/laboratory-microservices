import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'notification_queue',
        queueOptions: {
          durable: true,
        },
        exchange: 'amq.topic',
        exchangeType: 'topic',
        bindings: [
          {
            queue: 'notification_queue',
            bindingKey: 'order.#',
          },
          {
            queue: 'notification_queue',
            bindingKey: 'payment.#',
          },
        ],
      },
    },
  );
  await app.listen();

  Logger.log(`🚀 Notification Service Application is listening...`);
}
bootstrap();
