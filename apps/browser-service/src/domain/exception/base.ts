import { ServiceErrorCode, Status } from '@diut/services'

export class EDomain extends Error {
  errorCode: ServiceErrorCode
  grpcStatus: Status

  constructor(
    errorCode: ServiceErrorCode,
    message?: string,
    cause?: unknown,
    grpcStatus?: Status,
  ) {
    super(message, { cause })

    this.errorCode = errorCode
    this.grpcStatus = grpcStatus ?? Status.UNKNOWN
  }
}

export class EUnknown extends EDomain {
  constructor(message?: string, cause?: unknown) {
    super(ServiceErrorCode.BROWSER_UNKNOWN, message, cause)
  }
}
