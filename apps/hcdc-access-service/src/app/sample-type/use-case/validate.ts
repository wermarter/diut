import { Inject, Injectable } from '@nestjs/common'
import { SampleType, BranchAction, AuthSubject, EntityData } from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'

@Injectable()
export class SampleTypeValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<SampleType>>) {
    const { ability } = this.authContext.getData()
    const { branchId } = input

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }
  }
}
