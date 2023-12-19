import { ExecutionContext, Injectable, Scope } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { ContextData, IAuthContext, User } from 'src/domain'

@Injectable({ scope: Scope.REQUEST })
export class AuthContext implements IAuthContext {
  private contextData: ContextData

  async ensureContextData(executionContext: ExecutionContext) {
    const request = executionContext.switchToHttp().getRequest<ExpressRequest>()
    const user = request.user as User

    this.contextData = { user }
  }

  getData() {
    return this.contextData
  }
}
