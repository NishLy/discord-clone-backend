import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module.js';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformerInterceptor } from './common/interceptors/transformer.interceptor.js';
import HttpExceptionFilter from './common/filters/HTTPexception.filter.js';
import { TypeormExceptionFilter } from './common/filters/typeorm-exception/typeorm-exception.filter.js';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeormExceptionFilter,
    },
  ],
})
export class AppModule {}
