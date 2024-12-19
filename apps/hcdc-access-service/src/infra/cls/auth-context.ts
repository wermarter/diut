import { Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'
import {
  AuthContextData,
  AuthType,
  EAuthzAuthenticationRequired,
  EAuthzContextInvalid,
  IAuthContext,
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

  getDataInternal() {
    const authContextData = this.cls.get('authContextData')
    if (authContextData === undefined) {
      throw new EAuthzAuthenticationRequired()
    }

    if (authContextData.type !== AuthType.Internal) {
      throw new EAuthzContextInvalid(`type=${authContextData.type}`)
    }

    return authContextData
  }

  getDataExternal() {
    const authContextData = this.cls.get('authContextData')
    if (authContextData === undefined) {
      throw new EAuthzAuthenticationRequired()
    }

    if (authContextData.type !== AuthType.External) {
      throw new EAuthzContextInvalid(`type=${authContextData.type}`)
    }

    return authContextData
  }
}
