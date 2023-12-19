import { Inject, Injectable } from '@nestjs/common'

import { IUseCase } from '../interface'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'

export type AuthMeUseCaseInput = void
export type AuthMeUseCaseOutput = unknown

@Injectable()
export class AuthMeUseCase
  implements IUseCase<AuthMeUseCaseInput, AuthMeUseCaseOutput>
{
  constructor(@Inject(AuthContextToken) private authContext: IAuthContext) {}

  async execute(input: AuthMeUseCaseInput) {
    return this.authContext.getData()
  }
}
