import { firstValueFrom } from 'rxjs';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'apps/constants';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<any> {
    return firstValueFrom(this.client.send('auth.register.user', data)).catch(
      (err) => {
        throw new RpcException(err);
      },
    );
  }

  @Post('login')
  async login(@Body() data: LoginDto): Promise<any> {
    return firstValueFrom(this.client.send('auth.login.user', data)).catch(
      (err) => {
        throw new RpcException(err);
      },
    );
  }

  @Get('verify')
  async verifyToken(@Body() data: any): Promise<any> {
    return firstValueFrom(this.client.send('auth.verify.user', data)).catch(
      (err) => {
        throw new RpcException(err);
      },
    );
  }
}
