import { Inject, Injectable } from '@nestjs/common'
import { BranchAction, RoleAction, User, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  EntityFindOneOptions,
  IAuthContext,
  authorizePopulates,
  EEntityPopulatePathUnknown,
} from 'src/domain'

@Injectable()
export class UserAuthorizePopulatesUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}
  execute(input: EntityFindOneOptions<User>['populates']) {
    const { ability } = this.authContext.getData()

    return authorizePopulates(ability, input, (path) => {
      switch (path) {
        case 'roles':
          return { subject: AuthSubject.Role, action: RoleAction.Read }
        case 'branches':
          return { subject: AuthSubject.Branch, action: BranchAction.Read }
        default:
          throw new EEntityPopulatePathUnknown(path)
      }
    })
  }
}
