import {
  BROWSER_SERVICE_NAME,
  BrowserServiceClient,
  Metadata,
  PrintPageRequest,
} from '@diut/services'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
  Observable,
  catchError,
  firstValueFrom,
  map,
  of,
  throwError,
} from 'rxjs'
import { EBrowserServiceException, IBrowserService } from 'src/domain'

@Injectable()
export class BrowserService implements IBrowserService {
  private service: BrowserServiceClient
  private readonly logger = new Logger(this.constructor.name)

  constructor(@Inject(BROWSER_SERVICE_NAME) client: ClientGrpc) {
    this.service = client.getService<BrowserServiceClient>(BROWSER_SERVICE_NAME)
  }

  private handleError<TInput, TOutput>(
    input$: Observable<TInput>,
    handler: (input$: Observable<TInput>) => Observable<TOutput>,
  ) {
    const upstreamError: { isUpstreamError: boolean; error?: unknown } = {
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
        const metadata = JSON.stringify(
          (error.metadata as Metadata)?.toJSON?.(),
        )

        if (error.isUpstreamError || upstreamError.isUpstreamError) {
          if (
            upstreamError.isUpstreamError &&
            error.isUpstreamError === undefined
          ) {
            // log downstream error
            this.logger.warn(
              new EBrowserServiceException(error?.details, {
                metadata,
              }),
            )
          }

          // always throw upstream error
          return throwError(() => upstreamError.error)
        }

        return throwError(
          () =>
            new EBrowserServiceException(error?.details, {
              metadata,
            }),
        )
      }),
    )
  }

  printMultiplePage(request$: Observable<PrintPageRequest>) {
    return firstValueFrom(
      this.handleError(request$, this.service.printMultiplePage),
    )
  }
}
