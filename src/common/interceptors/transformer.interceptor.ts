import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseBuilder } from '../responses/generic.response';

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    return next.handle().pipe(map((data) => new ResponseBuilder(ctx, data)));
  }
}
