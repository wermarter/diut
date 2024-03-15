import { ServiceErrorCode, Status } from '@diut/services'

import { EDomain } from '../base'

export class EPuppeteer extends EDomain {
  constructor(
    errorCode?: ServiceErrorCode,
    message?: string,
    cause?: unknown,
    grpcStatus?: Status,
  ) {
    super(
      errorCode ?? ServiceErrorCode.BROWSER_PUPPETEER,
      message,
      cause,
      grpcStatus,
    )
  }
}
