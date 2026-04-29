import { Controller, Inject, Logger, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, PAYMENT_SERVICE } from 'apps/constants';
import {
  type IOrdersService,
  ORDERS_SERVICE,
} from './interfaces/order.service.interface';
import { PaginationDto } from 'apps/commons/pagination.dto';
import { CreateOrderDto } from './dtos';

@Controller()
export class OrderServiceController {
  private readonly logger = new Logger('OrderServiceController');

  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly orderService: IOrdersService,
    @Inject(PAYMENT_SERVICE) private readonly paymentClient: ClientProxy,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  @MessagePattern('order-find-all')
  async findAll(@Payload() query: PaginationDto): Promise<any> {
    this.logger.log('findAllOrders', query);
    return this.orderService.findAll(query);
  }

  @MessagePattern('order-find-by-id')
  async findById(@Payload(new ParseUUIDPipe()) id: string) {
    this.logger.log('[Order-Service]: Order ID: ', id);
    return this.orderService.findById(id);
  }

  @MessagePattern('order-created')
  async create(@Payload() order: CreateOrderDto) {
    this.logger.log('[Order-Service]: Received new order: ', order);
    const item = await this.orderService.create(order);
    // this.paymentClient.emit('payment-process', item);
    // this.notificationClient.emit('order-created', item);
    return { message: 'Order created', id: item.id };
  }

  @MessagePattern('order-updated')
  async update(@Payload() data: any) {
    // this.logger.log('[Order-Service]: Updated order: ', data);
    // await this.orderService.update(data.id, data.payload);
    // return { message: 'Order updated', data.id };
  }

  @MessagePattern('order-deleted')
  async delete(@Payload() id: string) {
    this.logger.log('[Order-Service]: Delete order: ', id);
    await this.orderService.delete(id);
    return { message: 'Order deleted', id };
  }
}
