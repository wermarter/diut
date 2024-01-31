import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, assertPermission } from 'src/domain/auth'
import { BranchAction } from 'src/domain/entity'
import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'
import { BranchAssertExistsUseCase } from './assert-exists'
import { BranchValidateUseCase } from './validate'

@Injectable()
export class BranchUpdateUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly branchValidateUseCase: BranchValidateUseCase,
  ) {}

  async execute(...input: Parameters<IBranchRepository['update']>) {
    const entity = await this.branchAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Update, entity)
    await this.branchValidateUseCase.execute(input[1])

    return this.branchRepository.update(...input)
  }
}
