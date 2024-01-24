import { Injectable } from '@nestjs/common'

import { Branch, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from './assert-exists'

@Injectable()
export class BranchValidateUseCase {
  constructor(
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<Pick<EntityData<Branch>, 'sampleOriginIds'>>) {
    const { sampleOriginIds } = input

    if (sampleOriginIds) {
      for (const branchId of sampleOriginIds) {
        await this.branchAssertExistsUseCase.execute({ _id: branchId })
      }
    }
  }
}
