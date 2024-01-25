import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'

import { EDomain } from 'src/domain'
import { HttpErrorResponse } from '../dto'

@Catch(EDomain)
export class DomainExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DomainExceptionFilter.name)

  constructor() {}

  catch(exception: EDomain, host: ArgumentsHost) {
    this.logger.error(exception)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response
      .status(exception.httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        errorCode: exception.errorCode,
        message: exception.message,
      } satisfies HttpErrorResponse)
  }
}
