import { ServiceErrorCode, Status } from '@diut/services'
import { EPuppeteer } from './base'

export class EPuppeteerInitFailed extends EPuppeteer {
  constructor(cause?: unknown) {
    super(
      ServiceErrorCode.BROWSER_PUPPETEER_INIT_FAILED,
      `failed to init browser`,
      cause,
      Status.FAILED_PRECONDITION,
    )
  }
}
