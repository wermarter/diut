import { Injectable } from '@nestjs/common'

import { Role, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'

@Injectable()
export class RoleValidateUseCase {
  constructor(
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<Pick<EntityData<Role>, 'branchIds'>>) {
    const { branchIds } = input

    if (branchIds) {
      for (const branchId of branchIds) {
        await this.branchAssertExistsUseCase.execute({ _id: branchId })
      }
    }
  }
}
