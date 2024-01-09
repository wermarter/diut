import { Inject, Injectable } from '@nestjs/common'

import { EAuthnPayloadUserNotFound } from 'src/domain/exception'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'

@Injectable()
export class AuthMeUseCase {
  constructor(
    @Inject(AuthContextToken)
    private authContext: IAuthContext,
  ) {}

  execute() {
    const data = this.authContext.getData()

    if (data === undefined) {
      throw new EAuthnPayloadUserNotFound()
    }

    return data
  }
}
