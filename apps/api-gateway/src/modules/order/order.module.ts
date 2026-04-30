import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ORDER_SERVICE } from 'apps/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: ORDER_SERVICE,
      //   transport: Transport.RMQ,
      //   options: {
      //     urls: ['amqp://admin:admin@localhost:5672'],
      //     queue: 'order_queue',
      //     queueOptions: {
      //       durable: true,
      //     },
      //   },
      // },
      {
        name: ORDER_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'order_queue',
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
