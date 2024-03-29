import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common'

import {
  AuthContextToken,
  EDomain,
  IAuthContext,
  buildErrorLog,
} from 'src/domain'
import { HttpErrorResponse } from '../dto'

@Catch(EDomain)
export class DomainExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DomainExceptionFilter.name)

  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  catch(exception: EDomain, host: ArgumentsHost) {
    const authContextData = this.authContext.getData(true)
    this.logger.error(
      buildErrorLog({
        exception,
        authContextData,
      }),
    )

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
