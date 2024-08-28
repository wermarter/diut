import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable, tap } from 'rxjs'

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()

    const { method, url } = request

    const timeStarted = Date.now()
    return next.handle().pipe(
      tap(() => {
        const timeFinished = Date.now()
        const duration = timeFinished - timeStarted
        const { statusCode } = response

        this.logger.verbose({
          message: 'Finish',
          method,
          url,
          statusCode,
          duration,
        })
      }),
    )
  }
}
