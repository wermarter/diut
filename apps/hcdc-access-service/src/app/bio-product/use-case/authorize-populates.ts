import { Inject, Injectable } from '@nestjs/common'
import { BranchAction, BioProduct, AuthSubject, TestAction } from '@diut/hcdc'

import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
  authorizePopulates,
  EEntityPopulatePathUnknown,
} from 'src/domain'

@Injectable()
export class BioProductAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}
  execute(input: EntityFindOneOptions<BioProduct>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'test':
          return { subject: AuthSubject.Test, action: TestAction.Read }
        case 'branch':
          return { subject: AuthSubject.Branch, action: BranchAction.Read }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
