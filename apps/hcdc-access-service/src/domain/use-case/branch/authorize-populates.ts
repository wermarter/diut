import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, authorizePopulates } from 'src/domain/auth'
import { BranchAction, Branch } from 'src/domain/entity'
import { EEntityPopulatePathUnknown } from 'src/domain/exception'
import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain/interface'

@Injectable()
export class BranchAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}
  execute(input: EntityFindOneOptions<Branch>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'sampleOrigins':
          return { subject: AuthSubject.Branch, action: BranchAction.Read }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
