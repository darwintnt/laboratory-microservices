import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaginatedResult } from 'apps/commons/pagination.dto';
import { Order } from './generated/prisma/client';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
import { IOrdersRepository } from './interfaces/order.repository.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrderRepository implements IOrdersRepository {
  constructor(
    @Inject('DATABASE_SERVICE') private readonly prisma: PrismaService,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search: string,
    conditions?: Record<string, any>,
  ): Promise<PaginatedResult<Order>> {
    const skip = (page - 1) * limit;

    const where = {
      ...conditions,
    };

    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count(),
    ]);

    return {
      data: data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Order | null> {
    const item = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!item) {
      throw new RpcException({
        message: `Order with id #${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return item;
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const item = await this.prisma.order.create({
      data: {
        totalAmount: Number(dto.totalAmount || 0),
        totalItems: Number(dto.totalItems || 0),
      },
    });
    return item;
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order | null> {
    try {
      const item = await this.prisma.order.update({
        where: { id },
        data: { totalAmount: Number(dto.totalAmount || 0) },
      });

      if (!item) {
        throw new RpcException({
          message: `Order with id #${id} not found`,
          status: HttpStatus.NOT_FOUND,
        });
      }

      return item;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string): Promise<Order> {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
