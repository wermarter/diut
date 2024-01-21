import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, BranchAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'
import { EEntityNotFound } from 'src/domain/exception'

@Injectable()
export class BranchUpdateUseCase {
  constructor(
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(...input: Parameters<IBranchRepository['update']>) {
    const { ability } = this.authContext.getData()

    const entity = await this.branchRepository.findOne({
      filter: input[0],
    })

    if (entity === null) {
      throw new EEntityNotFound(`Branch ${JSON.stringify(input[0])}`)
    }

    assertPermission(ability, AuthSubject.Branch, BranchAction.Update, entity)

    return this.branchRepository.update(...input)
  }
}
