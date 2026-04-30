import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

export interface IAuthService {
  register(payload: RegisterDto): Promise<any>;
  login(payload: LoginDto): Promise<{ access_token: string }>;
  verify(token: string): Promise<any>;
}

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');
