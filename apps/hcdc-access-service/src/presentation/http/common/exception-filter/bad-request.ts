import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { ERequestInvalidInput } from 'src/domain'
import { HttpErrorResponse } from '../dto'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private logger = new Logger(BadRequestExceptionFilter.name)

  constructor() {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const exceptionResponse = exception.getResponse()

    if (exceptionResponse['message'] != undefined) {
      // probably class-validator exception
      throw new ERequestInvalidInput(
        JSON.stringify(exceptionResponse['message']),
      )
    }

    this.logger.error(exception)

    response.status(HttpStatus.BAD_REQUEST).json({
      errorCode: DomainErrorCode.UNKNOWN,
      message: JSON.stringify(exception.getResponse()),
    } satisfies HttpErrorResponse)
  }
}
