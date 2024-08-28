import {
  Metadata,
  ServiceErrorCode,
  StatusBuilder,
  status,
} from '@diut/services'
import { Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { throwError } from 'rxjs'

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name)

  catch(exception: Error) {
    this.logger.error(exception)

    const statusBuilder = new StatusBuilder()
    statusBuilder.withCode(status.UNKNOWN)
    statusBuilder.withDetails(String(exception))

    const statusMetadata = new Metadata()
    statusMetadata.set('service-error-code', ServiceErrorCode.BROWSER_UNKNOWN)
    statusBuilder.withMetadata(statusMetadata)

    return throwError(() => statusBuilder.build())
  }
}
