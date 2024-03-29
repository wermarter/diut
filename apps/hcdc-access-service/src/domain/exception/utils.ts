import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
import { inspect } from 'util'

import { AuthContextData } from '../interface'

export function buildErrorLog(
  input: Partial<{
    authContextData: AuthContextData
    exception: any
    message: string
    errorCode: DomainErrorCode
    httpStatus: HttpStatus
    stack: string
    cause: unknown
  }>,
) {
  return {
    userId: input.authContextData?.user._id,
    message: input.exception.message ?? input.message,
    stack: input.exception.stack ?? input.stack,
    cause: inspect(input.exception.cause ?? input.cause),
    errorCode: input.exception.errorCode ?? input.errorCode,
    httpStatus: input.exception.httpStatus ?? input.httpStatus,
  }
}
