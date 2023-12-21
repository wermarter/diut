import {
  ExecutionContext,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Scope,
} from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import {
  ContextData,
  IAuthorizationContext,
  UserFindOneUseCase,
} from 'src/domain'
import { UnauthenticatedException } from './exception'
import { AuthPayload } from '../authentication/common'

@Injectable({ scope: Scope.REQUEST })
export class AuthorizationContext
  implements IAuthorizationContext, OnModuleInit, OnModuleDestroy
{
  private logger: Logger = new Logger(AuthorizationContext.name)
  private contextData: ContextData

  constructor(private userFindOneUseCase: UserFindOneUseCase) {}

  onModuleInit() {
    this.logger.debug('onModuleInit')
  }

  onModuleDestroy() {
    this.logger.debug('onModuleDestroy')
  }

  async prepareData(executionContext: ExecutionContext) {
    const request = executionContext.switchToHttp().getRequest<ExpressRequest>()
    const payload = request.user as AuthPayload

    if (!payload) {
      this.contextData = {
        user: {
          _id: 'none',
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'none',
          password: 'dsd',
          username: 'dads',
        },
      }

      return
    }

    const user = await this.userFindOneUseCase.execute({
      filter: { _id: payload.userId },
    })
    if (!user) {
      throw new UnauthenticatedException('JWT_USERID_NOT_FOUND')
    }

    this.contextData = { user }
  }

  getData() {
    return this.contextData
  }
}
