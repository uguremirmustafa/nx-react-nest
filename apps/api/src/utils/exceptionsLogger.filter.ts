import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      '************ Exception thrown ************\n',
      exception.response,
      '\n******************************************\n',
    );
    super.catch(exception, host);
  }
}
