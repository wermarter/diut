import { AuthSubject, Branch, BranchAction, EntityData } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { BranchAssertExistsUseCase } from './assert-exists'

@Injectable()
export class BranchValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<Branch>>) {
    const { ability } = this.authContext.getData()
    const { sampleOriginIds } = input

    if (sampleOriginIds?.length) {
      for (const branchId of sampleOriginIds) {
        const branch = await this.branchAssertExistsUseCase.execute({
          _id: branchId,
        })
        assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
      }
    }
  }
}
