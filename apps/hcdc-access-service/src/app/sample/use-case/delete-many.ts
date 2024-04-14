import { Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { Sample } from '@diut/hcdc'

import { SampleSearchUseCase } from './search'
import { SampleDeleteUseCase } from './delete'

@Injectable()
export class SampleDeleteManyUseCase {
  constructor(
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    private readonly sampleDeleteUseCase: SampleDeleteUseCase,
  ) {}

  async execute(input: FilterQuery<Sample>) {
    const samples = await this.sampleSearchUseCase.execute(input)

    for (const sample of samples.items) {
      await this.sampleDeleteUseCase.execute({ id: sample._id })
    }
  }
}
