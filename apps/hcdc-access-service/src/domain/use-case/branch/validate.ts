import { Inject, Injectable } from '@nestjs/common'

import { Branch, BranchAction, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from './assert-exists'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { AuthSubject, assertPermission } from 'src/domain/auth'

@Injectable()
export class BranchValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
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
