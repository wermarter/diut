import { DomainErrorCode } from '@diut/hcdc'
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common'

import {
  AUTH_CONTEXT_TOKEN,
  ERequestInvalidInput,
  IAuthContext,
  buildErrorLog,
} from 'src/domain'
import { HttpErrorResponse } from '../dto'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private logger = new Logger(BadRequestExceptionFilter.name)

  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const next = ctx.getNext()

    const exceptionResponse = exception.getResponse()

    if (exceptionResponse['message'] != undefined) {
      // probably class-validator exception
      next(
        new ERequestInvalidInput(JSON.stringify(exceptionResponse['message'])),
      )

      return
    }

    const authContextData = this.authContext.getData(true)
    this.logger.error(
      buildErrorLog({
        exception,
        authContextData,
        errorCode: DomainErrorCode.UNKNOWN,
        httpStatus: HttpStatus.BAD_REQUEST,
      }),
    )

    response.status(HttpStatus.BAD_REQUEST).json({
      errorCode: DomainErrorCode.UNKNOWN,
      message: JSON.stringify(exception.getResponse()),
    } satisfies HttpErrorResponse)
  }
}
