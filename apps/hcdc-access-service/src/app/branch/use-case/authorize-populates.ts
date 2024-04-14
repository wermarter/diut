import { Inject, Injectable } from '@nestjs/common'
import { BranchAction, Branch, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
  authorizePopulates,
  EEntityPopulatePathUnknown,
} from 'src/domain'

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
