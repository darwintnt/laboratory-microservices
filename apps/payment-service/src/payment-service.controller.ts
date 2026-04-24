import { Controller, Get } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @Get()
  getHello(): string {
    return this.paymentServiceService.getHello();
  }

  @MessagePattern('payment-process')
  paymentProcess(@Payload() order: any) {
    console.log('[Payment-Service]: Payment in process: ', order);
    return { message: 'Payment in process' };
  }
}
