import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import {
  AUTH_SERVICE,
  type IAuthService,
} from './interfaces/auth.service.interface';

@Controller()
export class AuthServiceController {
  private readonly logger = new Logger('AuthServiceController');

  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @MessagePattern('auth.register.user')
  register(@Payload() data: RegisterDto): Promise<any> {
    this.logger.log('[Register]: ', data);
    return this.authService.register(data);
  }

  @MessagePattern('auth.login.user')
  login(@Payload() data: LoginDto): Promise<any> {
    return this.authService.login(data);
  }

  @MessagePattern('auth.verify.user')
  verifyToken(): Promise<any> {
    return this.authService.verify();
  }
}
