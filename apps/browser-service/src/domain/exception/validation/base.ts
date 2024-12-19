import { ServiceErrorCode, Status } from '@diut/services'
import { EDomain } from '../base'

export class EValidation extends EDomain {
  constructor(
    errorCode?: ServiceErrorCode,
    message?: string,
    cause?: unknown,
    grpcStatus?: Status,
  ) {
    super(
      errorCode ?? ServiceErrorCode.BROWSER_VALIDATION,
      message,
      cause,
      grpcStatus ?? Status.INVALID_ARGUMENT,
    )
  }
}
