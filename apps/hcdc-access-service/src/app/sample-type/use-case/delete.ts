import { AuthSubject, SampleType, SampleTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  ISampleRepository,
  ISampleTypeRepository,
  ITestRepository,
  SAMPLETYPE_REPO_TOKEN,
  SAMPLE_REPO_TOKEN,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { SampleTypeSearchUseCase } from './search'

@Injectable()
export class SampleTypeDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleTypeSearchUseCase: SampleTypeSearchUseCase,
  ) {}

  async execute(input: FilterQuery<SampleType>) {
    const { ability } = this.authContext.getData()
    const { items: sampleTypes } = await this.sampleTypeSearchUseCase.execute({
      filter: input,
    })

    for (const sampleType of sampleTypes) {
      assertPermission(
        ability,
        AuthSubject.SampleType,
        SampleTypeAction.Delete,
        sampleType,
      )

      const connectedSampleCount = await this.sampleRepository.count({
        sampleTypeIds: sampleType._id,
      })
      if (connectedSampleCount > 0) {
        throw new EEntityCannotDelete(
          `${connectedSampleCount} connected Sample`,
        )
      }

      const connectedTestCount = await this.testRepository.count({
        sampleTypeId: sampleType._id,
      })
      if (connectedTestCount > 0) {
        throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
      }

      await this.sampleTypeRepository.deleteById(sampleType._id)
    }
  }
}
