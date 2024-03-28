import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { DomainErrorCode } from '@diut/hcdc'

import { HttpErrorResponse } from '../dto'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name)

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception)

    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const message = String(exception)

    const responseBody: HttpErrorResponse = {
      errorCode: DomainErrorCode.UNKNOWN,
      message,
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
