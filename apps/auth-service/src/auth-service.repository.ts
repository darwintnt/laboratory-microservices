import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaginatedResult } from 'apps/commons/pagination.dto';

import { RpcException } from '@nestjs/microservices';
import { type IAuthRepository } from './interfaces/auth.repository.interface';
import { User } from './generated/prisma/client';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject('DATABASE_SERVICE') private readonly prisma: PrismaService,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search: string,
    conditions?: Record<string, any>,
  ): Promise<PaginatedResult<User>> {
    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        OR: [{ name: { contains: search } }],
      }),
      ...conditions,
    };

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
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

  async findById(id: string): Promise<User | null> {
    const item = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!item) {
      throw new RpcException({
        message: `User with id #${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return item;
  }

  async create(dto: RegisterDto): Promise<User> {
    const item = await this.prisma.user.create({
      data: { ...dto },
    });
    return item;
  }

  async update(id: string, dto: RegisterDto): Promise<User | null> {
    try {
      const item = await this.prisma.user.update({
        where: { id },
        data: { ...dto },
      });

      if (!item) {
        throw new RpcException({
          message: `User with id #${id} not found`,
          status: HttpStatus.NOT_FOUND,
        });
      }

      return item;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findUnique(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }
}
