import {
  BROWSER_SERVICE_NAME,
  BrowserServiceClient,
  PrintPageReply,
  PrintPageRequest,
} from '@diut/services'
import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { Observable, catchError, map, of, throwError } from 'rxjs'

import { EBrowserServiceException, IBrowserService } from 'src/domain'

@Injectable()
export class BrowserService implements IBrowserService {
  private service: BrowserServiceClient

  constructor(@Inject(BROWSER_SERVICE_NAME) client: ClientGrpc) {
    this.service = client.getService<BrowserServiceClient>(BROWSER_SERVICE_NAME)
  }

  private handleError<TInput, TOutput>(
    input$: Observable<TInput>,
    handler: (input$: Observable<TInput>) => Observable<TOutput>,
  ) {
    const upstreamError: { isUpstreamError: boolean; error?: any } = {
      isUpstreamError: false,
    }
    return handler(
      input$.pipe(
        catchError((e) => {
          upstreamError.isUpstreamError = true
          upstreamError.error = e
          return of()
        }),
      ),
    ).pipe(
      map((data) => {
        if (!upstreamError.isUpstreamError) {
          return data
        }
        throw upstreamError
      }),
      catchError((error) => {
        if (error.isUpstreamError) {
          return throwError(() => error.error)
        }
        return throwError(
          () => new EBrowserServiceException(error?.message, error),
        )
      }),
    )
  }

  printMultiplePage(
    request$: Observable<PrintPageRequest>,
  ): Observable<PrintPageReply> {
    return this.handleError(request$, this.service.printMultiplePage)
  }
}
