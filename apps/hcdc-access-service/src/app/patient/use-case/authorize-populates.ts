import { AuthSubject, BranchAction, Patient } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { authorizePopulates } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityPopulatePathUnknown,
  EntityFindOneOptions,
  IAuthContext,
} from 'src/domain'

@Injectable()
export class PatientAuthorizePopulatesUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  execute(input: EntityFindOneOptions<Patient>['populates']) {
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
