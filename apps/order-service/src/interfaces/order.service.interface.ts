import { PaginatedResult, PaginationDto } from 'apps/commons/pagination.dto';
import { Order } from '../generated/prisma/client';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';

export interface IOrdersService {
  findAll(query: PaginationDto): Promise<PaginatedResult<Order>>;
  findById(id: string): Promise<Order | null>;
  create(payload: CreateOrderDto): Promise<Order>;
  update(id: string, dto: UpdateOrderDto): Promise<Order | null>;
  delete(id: string): Promise<Order>;
}

export const ORDERS_SERVICE = Symbol('ORDERS_SERVICE');
