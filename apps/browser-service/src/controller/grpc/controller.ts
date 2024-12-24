import {
  BrowserServiceControllerMethods,
  BrowserServiceController as IBrowserServiceController,
  PrintPageReply,
  PrintPageRequest,
} from '@diut/services'
import { Controller } from '@nestjs/common'
import { Observable, concatMap } from 'rxjs'
import { BrowserPrintMultipleUseCase } from 'src/app/browser/use-case/print-multiple'
import { setTimeout } from 'timers/promises'
import { PrintPageRequestDto } from './dto/print-page.request-dto'
import { validateDto } from './shared'

@Controller()
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

  async testTimeout(): Promise<void> {
    return setTimeout(120_000)
  }

  async testError(): Promise<void> {
    throw new Error('test error')
  }
}
