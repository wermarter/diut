import { Metadata, StatusBuilder } from '@diut/services'
import { Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { throwError } from 'rxjs'

import { EDomain } from 'src/domain'

@Catch(EDomain)
export class DomainExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DomainExceptionFilter.name)

  catch(exception: EDomain) {
    this.logger.error(exception)

    const statusBuilder = new StatusBuilder()
    statusBuilder.withCode(exception.grpcStatus)
    statusBuilder.withDetails(exception.stack ?? exception.message)

    const statusMetadata = new Metadata()
    statusMetadata.set('service-error-code', exception.errorCode)
    statusBuilder.withMetadata(statusMetadata)

    return throwError(() => statusBuilder.build())
  }
}
