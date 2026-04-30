import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { User } from './generated/prisma/client';
import {
  AUTH_REPOSITORY,
  type IAuthRepository,
} from './interfaces/auth.repository.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  register(payload: RegisterDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  login(payload: LoginDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  verify(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
