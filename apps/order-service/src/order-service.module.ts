import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderService } from './order-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, PAYMENT_SERVICE } from 'apps/constants';
import { PrismaService } from './prisma.service';
import { ORDERS_REPOSITORY } from './interfaces/order.repository.interface';
import { OrderRepository } from './order-service.repository';
import { ORDERS_SERVICE } from './interfaces/order.service.interface';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: NOTIFICATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrderServiceController],
  providers: [
    {
      provide: ORDERS_SERVICE,
      useClass: OrderService,
    },
    {
      provide: ORDERS_REPOSITORY,
      useClass: OrderRepository,
    },
    {
      provide: 'DATABASE_SERVICE',
      useClass: PrismaService,
    },
  ],
})
export class OrderServiceModule {}
