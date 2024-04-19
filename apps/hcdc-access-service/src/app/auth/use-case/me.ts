import { Inject, Injectable } from '@nestjs/common'

import { AuthContextToken, IAuthContext } from 'src/domain'

@Injectable()
export class AuthMeUseCase {
  constructor(
    @Inject(AuthContextToken)
    private authContext: IAuthContext,
  ) {}

  execute() {
    const data = this.authContext.getData()

    return data
  }
}
