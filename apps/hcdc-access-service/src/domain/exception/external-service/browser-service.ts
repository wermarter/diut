import { DomainErrorCode } from '@diut/hcdc'

import { EExternalService } from './base'

export class EBrowserService extends EExternalService {
  constructor(errorCode?: DomainErrorCode, message?: string, cause?: unknown) {
    super(errorCode ?? DomainErrorCode.BROWSER_SERVICE, message, cause)
  }
}

export class EBrowserServiceException extends EBrowserService {
  constructor(message?: string, cause?: unknown) {
    super(DomainErrorCode.BROWSER_SERVICE_EXCEPTION, message, cause)
  }
}
