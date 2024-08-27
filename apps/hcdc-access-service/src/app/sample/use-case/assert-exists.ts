import { Inject, Injectable } from '@nestjs/common'
import { Sample } from '@diut/hcdc'

import {
  SAMPLE_REPO_TOKEN,
  EntityFindOneOptions,
  ISampleRepository,
  EEntityNotFound,
} from 'src/domain'

@Injectable()
export class SampleAssertExistsUseCase {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
  ) {}

  async execute(input: EntityFindOneOptions<Sample>['filter']) {
    const rv = await this.sampleRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`Sample ${JSON.stringify(input)}`)
    }

    return rv
  }
}
