import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'apps/constants';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'auth_queue',
        },
      },
    ]),
  ],
})
export class AuthModule {}
