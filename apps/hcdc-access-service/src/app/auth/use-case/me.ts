import { Inject, Injectable } from '@nestjs/common'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'

@Injectable()
export class AuthMeUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private authContext: IAuthContext,
  ) {}

  execute() {
    const data = this.authContext.getData()

    return data
  }
}
