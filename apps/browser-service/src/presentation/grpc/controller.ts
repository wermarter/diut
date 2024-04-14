import {
  BrowserServiceControllerMethods,
  BrowserServiceController as IBrowserServiceController,
  PrintPageReply,
  PrintPageRequest,
} from '@diut/services'
import { Observable, concatMap } from 'rxjs'

import { GrpcController, validateDto } from './common'
import { BrowserPrintMultipleUseCase } from 'src/app/browser'
import { PrintPageRequestDto } from './dto/print-page.request-dto'

@GrpcController()
@BrowserServiceControllerMethods()
export class BrowserServiceController implements IBrowserServiceController {
  constructor(
    private readonly browserPrintMultipleUseCase: BrowserPrintMultipleUseCase,
  ) {}

  async printMultiplePage(
    request$: Observable<PrintPageRequest>,
  ): Promise<PrintPageReply> {
    const validatedDto$ = request$.pipe(
      concatMap(async (value) => {
        return validateDto(value, PrintPageRequestDto)
      }),
    )

    const mergedPdf =
      await this.browserPrintMultipleUseCase.execute(validatedDto$)

    return { mergedPdf }
  }
}
