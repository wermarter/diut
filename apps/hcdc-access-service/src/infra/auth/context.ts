import { Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'

import {
  IAuthContext,
  EAuthzAuthenticationRequired,
  AuthContextData,
} from 'src/domain'

@Injectable()
export class AuthContext implements IAuthContext {
  constructor(private readonly cls: ClsService) {}

  setData(data: AuthContextData) {
    this.cls.set('authContextData', data)
  }

  getData(unsafe?: boolean) {
    const authContextData = this.cls.get('authContextData')
    if (!unsafe && authContextData === undefined) {
      throw new EAuthzAuthenticationRequired()
    }

    return authContextData
  }
}
