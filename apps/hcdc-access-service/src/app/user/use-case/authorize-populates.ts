import { AuthSubject, BranchAction, RoleAction, User } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { authorizePopulates } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityPopulatePathUnknown,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain'

@Injectable()
export class UserAuthorizePopulatesUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
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
