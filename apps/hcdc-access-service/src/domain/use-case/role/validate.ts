import { Injectable } from '@nestjs/common'

import { Role, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'

@Injectable()
export class RoleValidateUseCase {
  constructor(
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<Pick<EntityData<Role>, 'branchId'>>) {
    const { branchId } = input

    if (branchId !== undefined) {
      await this.branchAssertExistsUseCase.execute({ _id: branchId })
    }
  }
}
