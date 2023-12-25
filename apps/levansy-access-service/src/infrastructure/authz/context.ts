import { Injectable, Scope } from '@nestjs/common'

import {
  AuthPayload,
  ContextData,
  EAuthnPayloadNotFound,
  IAuthzContext,
  UserFindOneUseCase,
  unauthenticatedUser,
} from 'src/domain'

@Injectable({ scope: Scope.REQUEST })
export class AuthzContext implements IAuthzContext {
  private contextData: ContextData

  constructor(private userFindOneUseCase: UserFindOneUseCase) {}

  async prepareData(payload: AuthPayload | undefined) {
    if (!payload) {
      this.contextData = {
        user: unauthenticatedUser,
      }

      return
    }

    const user = await this.userFindOneUseCase.execute({
      filter: { _id: payload.userId },
    })
    if (!user) {
      throw new EAuthnPayloadNotFound()
    }

    this.contextData = { user }
  }

  getData() {
    return this.contextData
  }
}
