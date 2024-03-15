import { ServiceErrorCode, Status } from '@diut/services'

import { EValidation } from './base'

export class EValidationRequestFailed extends EValidation {
  constructor(cause?: unknown) {
    super(
      ServiceErrorCode.BROWSER_VALIDATION_REQUEST_FAILED,
      `request param invalid`,
      cause,
      Status.INVALID_ARGUMENT,
    )
  }
}
