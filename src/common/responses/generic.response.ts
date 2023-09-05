import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { randomUUID } from 'crypto';
import { Request } from 'express';

export class ResponseBuilder {
  protected data: Record<string, any>;
  protected timeStamp: number;
  protected idRequest: string;
  protected path: string;
  constructor(context: HttpArgumentsHost, data?: Record<string, any>) {
    const { path } = context.getRequest<Request>();
    this.path = path;
    this.data = data;
    this.timeStamp = Date.now();
    this.idRequest = randomUUID();
  }
}

export class ErrorResponseBuilder extends ResponseBuilder {
  error: Record<string, any>;
  constructor(context: HttpArgumentsHost, data?: Record<string, any>) {
    super(context, data);
    Object.assign(this, this.data);
    delete this.data;
  }
}
