import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, BranchAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'
import { BranchAssertExistsUseCase } from './assert-exists'

@Injectable()
export class BranchUpdateUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(...input: Parameters<IBranchRepository['update']>) {
    const entity = await this.branchAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Update, entity)

    return this.branchRepository.update(...input)
  }
}
