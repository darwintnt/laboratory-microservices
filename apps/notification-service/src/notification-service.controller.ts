import { Controller, Get } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationServiceService.getHello();
  }

  @MessagePattern('order-created')
  sendOrderCreated(@Payload() order: any) {
    console.log(
      '[Notification-Service]: Generate new order notification: ',
      order,
    );
  }

  @MessagePattern('payment-succeed')
  sendPaymentSucceed(@Payload() order: any) {
    console.log(
      '[Notification-Service]: Payment Succeed notification: ',
      order,
    );
  }
}
