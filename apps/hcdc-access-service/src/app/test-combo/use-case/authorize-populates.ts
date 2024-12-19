import { AuthSubject, BranchAction, TestAction, TestCombo } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { authorizePopulates } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityPopulatePathUnknown,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain'

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
