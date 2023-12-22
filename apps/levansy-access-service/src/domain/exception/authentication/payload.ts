import { HttpStatus } from '@nestjs/common'

import { EAuthentication } from './base'

export class EAuthenticationPayloadNotFound extends EAuthentication {
  constructor() {
    super('E1001', 'Payload not found', undefined, HttpStatus.BAD_REQUEST)
  }
}
