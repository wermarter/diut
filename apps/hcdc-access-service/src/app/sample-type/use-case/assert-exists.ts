import { SampleType } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import {
  EEntityNotFound,
  EntityFindOneOptions,
  ISampleTypeRepository,
  SAMPLETYPE_REPO_TOKEN,
} from 'src/domain'

@Injectable()
export class SampleTypeAssertExistsUseCase {
  constructor(
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
  ) {}

  async execute(input: EntityFindOneOptions<SampleType>['filter']) {
    const rv = await this.sampleTypeRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`SampleType ${JSON.stringify(input)}`)
    }

    return rv
  }
}
