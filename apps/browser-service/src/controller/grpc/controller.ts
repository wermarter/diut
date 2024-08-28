import {
  BrowserServiceControllerMethods,
  BrowserServiceController as IBrowserServiceController,
  PrintPageReply,
  PrintPageRequest,
} from '@diut/services'
import { Observable, concatMap } from 'rxjs'

import { BrowserPrintMultipleUseCase } from 'src/app/browser/use-case/print-multiple'
import { PrintPageRequestDto } from './dto/print-page.request-dto'
import { validateDto } from './shared'

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
