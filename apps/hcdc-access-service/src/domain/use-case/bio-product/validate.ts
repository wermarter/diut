import { Injectable } from '@nestjs/common'

import { BioProduct, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'

@Injectable()
export class BioProductValidateUseCase {
  constructor(
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<Pick<EntityData<BioProduct>, 'branchId'>>) {
    const { branchId } = input

    if (branchId !== undefined) {
      await this.branchAssertExistsUseCase.execute({ _id: branchId })
    }
  }
}
