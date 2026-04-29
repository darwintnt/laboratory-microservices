import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'apps/constants';

@Controller('orders')
export class OrderController {
  private readonly logger = new Logger('OrderController');

  constructor(@Inject(ORDER_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAllOrders(@Body() order: any) {
    this.logger.log('[Api-Gateway]: find all orders: ', order);
    const data = this.client.send('list-all-orders', order);
    return { message: 'Order sent to RabbitMQ', data };
  }

  @Post()
  createOrder(@Body() order: any) {
    this.client.emit('order-created', order);
    this.logger.log('[Api-Gateway]: Received new order: ', order);
    return { message: 'Order sent to RabbitMQ' };
  }
}
