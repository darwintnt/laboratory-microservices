import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import {
  AUTH_REPOSITORY,
  type IAuthRepository,
} from './interfaces/auth.repository.interface';
import { RpcException } from '@nestjs/microservices';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { configuration } from './config/envs';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto): Promise<any> {
    try {
      const handleExistUser = await this.authRepository.findUnique(
        payload.email,
      );

      if (handleExistUser) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        });
      }

      const hash = bcrypt.hashSync(payload.password, 10);

      const newUser = { ...payload, password: hash };

      const user = await this.authRepository.create(newUser);

      const { password: __, ...rest } = payload;

      return {
        user: { id: user.id, ...rest },
      };
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async login(payload: LoginDto): Promise<{ access_token: string }> {
    try {
      const { email, password } = payload;
      const user = await this.authRepository.findOne(email);

      if (!user) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email/Password not valid',
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, user?.password);

      if (!isPasswordValid) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email/Password not valid',
        });
      }

      const data = { sub: user.id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(data),
      };
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async verify(token: string): Promise<any> {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: configuration().jwt.secret,
      });

      return {
        user: user,
        token: await this.jwtService.signAsync(user),
      };
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
      });
    }
  }
}
