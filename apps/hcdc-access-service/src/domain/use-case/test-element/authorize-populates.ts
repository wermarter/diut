import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, authorizePopulates } from 'src/domain/auth'
import { BranchAction, TestAction, TestElement } from 'src/domain/entity'
import { EEntityPopulatePathUnknown } from 'src/domain/exception'
import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain/interface'

@Injectable()
export class TestElementAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}
  execute(input: EntityFindOneOptions<TestElement>['populates']) {
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
