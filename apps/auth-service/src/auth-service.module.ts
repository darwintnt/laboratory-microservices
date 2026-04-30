import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';
import { AUTH_SERVICE } from './interfaces/auth.service.interface';
import { AUTH_REPOSITORY } from './interfaces/auth.repository.interface';
import { AuthRepository } from './auth-service.repository';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/envs';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['apps/auth-service/.env'],
    }),
    JwtModule.register({
      global: true,
      secret: configuration().jwt.secret,
      signOptions: { expiresIn: configuration().jwt.expiresIn },
    }),
  ],
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
