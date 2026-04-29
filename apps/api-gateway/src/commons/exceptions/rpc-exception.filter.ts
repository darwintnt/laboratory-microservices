import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = (rpcError as any).status;
      const message = (rpcError as any).message;

      httpStatus = Object.values(HttpStatus).includes(status)
        ? status
        : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(httpStatus).json({ message, status });
    } else {
      response.status(httpStatus).json({
        status: httpStatus,
        message: rpcError,
      });
    }
  }
}
