import { Injectable, Scope } from '@nestjs/common'

import {
  AuthPayload,
  AuthContextData,
  IAuthContext,
  AuthPopulateContextUseCase,
  EAuthzAuthenticationRequired,
} from 'src/domain'

@Injectable({ scope: Scope.REQUEST })
export class AuthContext implements IAuthContext {
  private contextData: AuthContextData

  constructor(private authPopulateContextUseCase: AuthPopulateContextUseCase) {}

  async prepareData(payload: AuthPayload) {
    this.contextData = await this.authPopulateContextUseCase.execute(payload)
  }

  getData() {
    if (this.contextData === undefined) {
      throw new EAuthzAuthenticationRequired()
    }

    return this.contextData
  }
}
