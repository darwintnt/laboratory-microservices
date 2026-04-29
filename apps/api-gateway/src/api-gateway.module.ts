import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [OrderModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
