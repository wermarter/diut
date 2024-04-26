import { Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'

import {
  IAuthContext,
  EAuthzAuthenticationRequired,
  AuthContextData,
  AuthContextDataInternal,
  AuthType,
  EAuthzContextInvalid,
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

  getDataInternal(): Required<AuthContextDataInternal> {
    const authContextData = this.cls.get('authContextData')
    if (authContextData === undefined) {
      throw new EAuthzAuthenticationRequired()
    }

    if (authContextData.type !== AuthType.Internal) {
      throw new EAuthzContextInvalid(`type=${authContextData.type}`)
    }

    if (authContextData.metadata == undefined) {
      throw new EAuthzContextInvalid(`metadata=${authContextData.metadata}`)
    }

    return authContextData as Required<AuthContextDataInternal>
  }
}
