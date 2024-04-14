import { Inject, Injectable } from '@nestjs/common'
import { BranchAction, TestCategory, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
  authorizePopulates,
  EEntityPopulatePathUnknown,
} from 'src/domain'

@Injectable()
export class TestCategoryAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}
  execute(input: EntityFindOneOptions<TestCategory>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'branch':
          return { subject: AuthSubject.Branch, action: BranchAction.Read }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
