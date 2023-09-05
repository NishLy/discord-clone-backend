import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponseBuilder } from 'src/common/responses/generic.response';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormExceptionFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: TypeORMError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    httpAdapter.reply(
      ctx.getResponse(),
      new ErrorResponseBuilder(ctx, {
        message: exception.message,
        error: exception.name,
      }),
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
