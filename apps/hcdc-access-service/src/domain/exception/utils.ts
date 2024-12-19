import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
import { inspect } from 'util'
import { AuthContextData, AuthType } from '../interface'

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
  const cause = input.exception.cause ?? input.cause

  return {
    userId:
      input.authContextData?.type === AuthType.Internal
        ? input.authContextData.user._id
        : input.authContextData?.authorizedByUserId,
    message: input.exception.message ?? input.message,
    stack: input.exception.stack ?? input.stack,
    cause: cause && inspect(cause),
    errorCode: input.exception.errorCode ?? input.errorCode,
    httpStatus: input.exception.httpStatus ?? input.httpStatus,
  }
}
