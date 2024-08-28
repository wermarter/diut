import { AuthSubject, SampleTypeAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

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
import { SampleTypeAssertExistsUseCase } from './assert-exists'

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
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.sampleTypeAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.SampleType,
      SampleTypeAction.Delete,
      entity,
    )

    const connectedSampleCount = await this.sampleRepository.count({
      diagnosisId: input.id,
    })
    if (connectedSampleCount > 0) {
      throw new EEntityCannotDelete(`${connectedSampleCount} connected Sample`)
    }

    const connectedTestCount = await this.testRepository.count({
      bioProductId: input.id,
    })
    if (connectedTestCount > 0) {
      throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
    }

    await this.sampleTypeRepository.deleteById(input.id)

    return entity
  }
}
