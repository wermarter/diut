import { Sample } from '@diut/hcdc'
import { Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { SampleDeleteUseCase } from './delete'
import { SampleSearchUseCase } from './search'

@Injectable()
export class SampleDeleteManyUseCase {
  constructor(
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    private readonly sampleDeleteUseCase: SampleDeleteUseCase,
  ) {}

  async execute(input: FilterQuery<Sample>) {
    const samples = await this.sampleSearchUseCase.execute({ filter: input })

    for (const sample of samples.items) {
      await this.sampleDeleteUseCase.execute({ id: sample._id })
    }
  }
}
