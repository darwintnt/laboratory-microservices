import { PaginatedResult } from 'apps/commons/pagination.dto';
import { Order } from '../generated/prisma/client';
import { CreateOrderDto, UpdateOrderDto } from '../dtos';

export interface IOrdersRepository {
  findAll(
    page: number,
    limit: number,
    search: string,
    conditions?: Record<string, any>,
  ): Promise<PaginatedResult<Order>>;
  findById(id: string): Promise<Order | null>;
  create(dto: CreateOrderDto): Promise<Order>;
  update(id: string, dto: UpdateOrderDto): Promise<Order | null>;
  delete(id: string): Promise<Order>;
}

export const ORDERS_REPOSITORY = Symbol('ORDERS_REPOSITORY');
