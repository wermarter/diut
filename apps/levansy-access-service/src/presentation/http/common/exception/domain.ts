import { NodeEnv } from '@diut/common'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common'

import { AppConfig, loadAppConfig } from 'src/config'
import { EDomain } from 'src/domain'
import { HttpErrorResponse } from '../dto'

@Catch(EDomain)
export class DomainExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DomainExceptionFilter.name)

  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
  ) {}

  catch(exception: EDomain, host: ArgumentsHost) {
    this.logger.error(exception)

    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development

    response
      .status(exception.httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        errorCode: exception.errorCode,
        message: exception.message,
        stack: isDevelopment ? exception.stack : undefined,
      } satisfies HttpErrorResponse)
  }
}
