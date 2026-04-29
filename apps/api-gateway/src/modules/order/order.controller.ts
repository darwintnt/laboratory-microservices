import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'apps/commons/pagination.dto';
import { ORDER_SERVICE } from 'apps/constants';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, UpdateOrderDto } from './dtos';

@Controller('orders')
export class OrderController {
  private readonly logger = new Logger('OrderController');

  constructor(@Inject(ORDER_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  async findAllOrders(@Body() query: PaginationDto): Promise<any> {
    this.logger.log('[Api-Gateway] findAllOrders: ', query);
    return firstValueFrom(this.client.send('order-find-all', query)).catch(
      (err) => {
        throw new RpcException(err);
      },
    );
  }

  @Get(':id')
  async findOrderById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<any> {
    this.logger.log('[Api-Gateway] findOrderById: ', id);
    return await firstValueFrom(this.client.send('order-find-by-id', id)).catch(
      (err) => {
        throw new RpcException(err);
      },
    );
  }

  @Post()
  async createOrder(@Body() order: CreateOrderDto): Promise<any> {
    this.logger.log('[Api-Gateway] createOrder sent to RabbitMQ: ', order);
    return firstValueFrom(this.client.send('order-created', order)).catch(
      (err) => {
        throw new RpcException(err);
      },
    );
  }

  @Put()
  updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() order: UpdateOrderDto,
  ) {
    this.client.emit('order-updated', order);
    this.logger.log('[Api-Gateway] createOrder: ', order);
    return { message: 'Order sent to RabbitMQ' };
  }

  @Delete()
  deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    this.client.emit('order-deleted', id);
    this.logger.log('[Api-Gateway] createOrder: ', id);
    return { message: 'Order sent to RabbitMQ' };
  }
}
