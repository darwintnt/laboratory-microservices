import { User } from '../generated/prisma/client';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

export interface IAuthService {
  // findAll(query: PaginationDto): Promise<PaginatedResult<User>>;
  // findById(id: string): Promise<User | null>;
  // create(payload: RegisterDto): Promise<User>;
  // update(id: string, dto: RegisterDto): Promise<User | null>;
  // delete(id: string): Promise<User>;

  register(payload: RegisterDto): Promise<User>;
  login(payload: LoginDto): Promise<User>;
  verify(): Promise<User>;
}

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
