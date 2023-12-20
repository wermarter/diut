import {
  ExecutionContext,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import {
  AuthPayload,
  ContextData,
  IAuthContext,
  UserFindOneUseCase,
} from 'src/domain'

@Injectable({ scope: Scope.REQUEST })
export class AuthContext implements IAuthContext {
  private contextData: ContextData

  constructor(private userFindOneUseCase: UserFindOneUseCase) {}

  async populateContextData(executionContext: ExecutionContext) {
    const request = executionContext.switchToHttp().getRequest<ExpressRequest>()
    const payload = request.user as AuthPayload

    const user = await this.userFindOneUseCase.execute({ _id: payload.userId })
    if (!user) {
      throw new UnauthorizedException('JWT_USERID_NOT_FOUND')
    }

    this.contextData = { user }
  }

  getData() {
    return this.contextData
  }
}
