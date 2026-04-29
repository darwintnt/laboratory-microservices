import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, PAYMENT_SERVICE } from 'apps/constants';

@Controller()
export class OrderServiceController {
  private readonly logger = new Logger('OrderServiceController');

  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject(PAYMENT_SERVICE) private readonly paymentClient: ClientProxy,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.orderServiceService.getHello();
  }

  @MessagePattern('order-created')
  createOrder(@Payload() order: any) {
    this.logger.log('[Order-Service]: Received new order: ', order);
    this.paymentClient.emit('payment-process', order);
    this.notificationClient.emit('order-created', order);
    return { message: 'Order created' };
  }

  @MessagePattern('list-all-orders')
  findAllOrders(@Payload() order: any) {
    this.logger.log('findAllOrders', order);
    const data = [
      { id: 1, name: 'arroz' },
      { id: 2, name: 'nutella' },
    ];
    return { data };
  }
}
