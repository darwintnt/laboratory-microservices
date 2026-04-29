import { Inject, Injectable } from '@nestjs/common';
import { IOrdersService } from './interfaces/order.service.interface';
import { PaginationDto, PaginatedResult } from 'apps/commons/pagination.dto';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
import { Order } from './generated/prisma/client';
import {
  type IOrdersRepository,
  ORDERS_REPOSITORY,
} from './interfaces/order.repository.interface';

@Injectable()
export class OrderService implements IOrdersService {
  constructor(
    @Inject(ORDERS_REPOSITORY)
    private readonly orderRepository: IOrdersRepository,
  ) {}

  async findAll(query: PaginationDto): Promise<PaginatedResult<any>> {
    const { page, limit, search } = query;
    return this.orderRepository.findAll(page, limit, search ?? '');
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async create(payload: CreateOrderDto): Promise<Order> {
    return this.orderRepository.create(payload);
  }

  async update(id: string, payload: UpdateOrderDto): Promise<Order | null> {
    return this.orderRepository.update(id, payload);
  }

  async delete(id: string): Promise<Order> {
    return this.orderRepository.delete(id);
  }
}
