import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ORDER_SERVICE } from 'apps/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'order_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: envs.productsMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
