import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, Branch, BranchAction } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  assertPermission,
  EntityData,
} from 'src/domain'
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
