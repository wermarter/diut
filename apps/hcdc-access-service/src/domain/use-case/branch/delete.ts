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
export class BranchDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.branchAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Branch, BranchAction.Delete, entity)

    await this.branchRepository.deleteById(input.id)

    return entity
  }
}
