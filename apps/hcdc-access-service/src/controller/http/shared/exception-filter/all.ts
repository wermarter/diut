import { DomainErrorCode } from '@diut/hcdc'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { AUTH_CONTEXT_TOKEN, IAuthContext, buildErrorLog } from 'src/domain'
import { HttpErrorResponse } from '../dto'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name)

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const authContextData = this.authContext.getData(true)

    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const message = String(exception)

    if (exception instanceof Error) {
      this.logger.error(
        buildErrorLog({
          exception,
          authContextData,
          errorCode: DomainErrorCode.UNKNOWN,
          httpStatus,
        }),
      )
    } else {
      this.logger.error(
        buildErrorLog({
          authContextData,
          message,
          errorCode: DomainErrorCode.UNKNOWN,
          httpStatus,
        }),
      )
    }

    const responseBody: HttpErrorResponse = {
      errorCode: DomainErrorCode.UNKNOWN,
      message,
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
