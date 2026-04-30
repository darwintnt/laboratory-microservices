import { Module } from '@nestjs/common';
import { OrderModule } from './modules/order/order.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, OrderModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
