import { ServiceErrorCode, Status } from '@diut/services'
import { EValidation } from './base'

export class EValidationRequestFailed extends EValidation {
  constructor(message: string, cause?: unknown) {
    super(
      ServiceErrorCode.BROWSER_VALIDATION_REQUEST_FAILED,
      `request param invalid: ${message}`,
      cause,
      Status.INVALID_ARGUMENT,
    )
  }
}
