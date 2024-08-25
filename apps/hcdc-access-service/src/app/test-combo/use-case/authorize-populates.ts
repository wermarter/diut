import { Inject, Injectable } from '@nestjs/common'
import { BranchAction, TestAction, TestCombo, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  EEntityPopulatePathUnknown,
} from 'src/domain'
import { authorizePopulates } from 'src/app/auth/common'

@Injectable()
export class TestComboAuthorizePopulatesUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
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
