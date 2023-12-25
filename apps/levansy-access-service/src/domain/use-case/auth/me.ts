import { Inject, Injectable } from '@nestjs/common'

import { AuthzContextToken, IAuthzContext } from 'src/domain/interface'

@Injectable()
export class AuthMeUseCase {
  constructor(
    @Inject(AuthzContextToken)
    private authContext: IAuthzContext,
  ) {}

  async execute() {
    return this.authContext.getData()
  }
}
