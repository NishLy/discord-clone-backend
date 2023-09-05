import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core/helpers/http-adapter-host';
import { ErrorResponseBuilder } from '../responses/generic.response';

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    httpAdapter.reply(
      ctx.getResponse(),
      new ErrorResponseBuilder(ctx, exception),
      exception.getStatus(),
    );
  }
}
