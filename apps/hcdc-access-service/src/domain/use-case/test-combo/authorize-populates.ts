import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, authorizePopulates } from 'src/domain/auth'
import { BranchAction, TestAction, TestCombo } from 'src/domain/entity'
import { EEntityPopulatePathUnknown } from 'src/domain/exception'
import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain/interface'

@Injectable()
export class TestComboAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}
  execute(input: EntityFindOneOptions<TestCombo>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'tests':
          return { subject: AuthSubject.Test, action: TestAction.Read }
        case 'branch':
          return { subject: AuthSubject.Branch, action: BranchAction.Read }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
