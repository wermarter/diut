import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, BranchAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  BranchRepositoryToken,
  IAuthContext,
  IBranchRepository,
} from 'src/domain/interface'
import { BranchFindOneUseCase } from './find-one'
import { EEntityNotFound } from 'src/domain/exception'

@Injectable()
export class BranchDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BranchRepositoryToken)
    private readonly branchRepository: IBranchRepository,
    private readonly branchFindOneUseCase: BranchFindOneUseCase,
  ) {}

  async execute(input: { id: string }) {
    const { ability } = this.authContext.getData()

    const entity = await this.branchFindOneUseCase.execute({
      filter: { _id: input.id },
    })

    if (entity == null) {
      throw new EEntityNotFound(`Branch ${JSON.stringify(input)}`)
    }

    assertPermission(ability, AuthSubject.Branch, BranchAction.Delete, entity)

    await this.branchRepository.deleteById(input.id)

    return entity
  }
}
