import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  OnModuleInit,
} from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import _ from 'lodash';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter, OnModuleInit {
  constructor() {}

  async onModuleInit() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception['message'],
      // ...exception['response'],
      ...(typeof exception['response'] === 'string'
        ? {}
        : exception['response']),
    });

    console.log('Errors', {
      key: `${request.url}-${Date.now()}-${status}`,
      value: {
        statusCode: status,
        time: new Date().toISOString(),
        path: request.url,
        request: request.body,
        response: exception['response'],
        name: exception['name'],
        message: exception['message'],
        stack: exception['stack'],
      },
    });
  }
}
