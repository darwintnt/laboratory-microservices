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
  createOrder(@Payload() order: any) {
    console.log(
      '[Notification-Service]: Generate new order notification: ',
      order,
    );
    return { message: 'Notification Order created' };
  }
}
