import {
  BrowserServiceControllerMethods,
  BrowserServiceController as IBrowserServiceController,
  PrintSampleRequest,
} from '@diut/services'
import { sample } from 'lodash'
import { Observable } from 'rxjs'

import { BrowserService } from 'src/app'

@BrowserServiceControllerMethods()
export class BrowserServiceController implements IBrowserServiceController {
  constructor(private readonly browserService: BrowserService) {}

  async printSamples(request: Observable<PrintSampleRequest>) {
    const samplePDFs: string[] = []
    await request.forEach((req) => {
      samplePDFs.push(this.browserService.printSample(req))
    })

    console.log({ samplePDFs })

    return {
      mergedPDF: new Uint8Array(Buffer.from(samplePDFs.join('\n---\n'))),
    }
  }
}
