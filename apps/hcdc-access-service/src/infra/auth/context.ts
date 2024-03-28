import { Injectable } from '@nestjs/common'
import { ClsService } from 'nestjs-cls'

import { IAuthContext, EAuthzAuthenticationRequired } from 'src/domain'

@Injectable()
export class AuthContext implements IAuthContext {
  constructor(private readonly cls: ClsService) {}

  getData() {
    const authContextData = this.cls.get('authContextData')
    if (authContextData === undefined) {
      throw new EAuthzAuthenticationRequired()
    }

    return authContextData
  }
}
