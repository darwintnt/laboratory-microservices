import { PaginatedResult } from 'apps/commons/pagination.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../generated/prisma/client';

export interface IAuthRepository {
  findAll(
    page: number,
    limit: number,
    search: string,
    conditions?: Record<string, any>,
  ): Promise<PaginatedResult<User>>;
  findById(id: string): Promise<User | null>;
  create(dto: RegisterDto): Promise<User>;
  update(id: string, dto: RegisterDto): Promise<User | null>;
  delete(id: string): Promise<User>;
}

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');
