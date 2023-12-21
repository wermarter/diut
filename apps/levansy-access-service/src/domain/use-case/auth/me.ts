import { Inject, Injectable } from '@nestjs/common'

import {
  AuthorizationContextToken,
  IAuthorizationContext,
} from 'src/domain/interface'

@Injectable()
export class AuthMeUseCase {
  constructor(
    @Inject(AuthorizationContextToken)
    private authContext: IAuthorizationContext,
  ) {}

  async execute() {
    return this.authContext.getData()
  }
}
