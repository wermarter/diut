import { Inject, Injectable } from '@nestjs/common'

import { AuthContextToken, IAuthContext } from 'src/domain/interface'

@Injectable()
export class AuthMeUseCase {
  constructor(
    @Inject(AuthContextToken)
    private authContext: IAuthContext,
  ) {}

  async execute() {
    return this.authContext.getData()
  }
}
