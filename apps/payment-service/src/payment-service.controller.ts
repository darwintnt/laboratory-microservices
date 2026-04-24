import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from 'apps/constants';

@Controller()
export class PaymentServiceController {
  constructor(
    private readonly paymentServiceService: PaymentServiceService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.paymentServiceService.getHello();
  }

  @MessagePattern('payment-process')
  paymentProcess(@Payload() order: any) {
    console.log('[Payment-Service]: Payment in process: ', order);
    this.notificationClient.emit('payment-succeed', order);
    return { message: 'Payment in process' };
  }
}
