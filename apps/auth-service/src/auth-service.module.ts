import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';
import { PrismaService } from 'apps/order-service/src/prisma.service';
import { AUTH_SERVICE } from './interfaces/auth.service.interface';
import { AUTH_REPOSITORY } from './interfaces/auth.repository.interface';
import { AuthRepository } from './auth-service.repository';

@Module({
  imports: [],
  controllers: [AuthServiceController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    {
      provide: 'DATABASE_SERVICE',
      useClass: PrismaService,
    },
  ],
})
export class AuthServiceModule {}
