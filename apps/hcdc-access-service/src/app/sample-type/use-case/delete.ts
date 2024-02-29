import { Inject, Injectable } from '@nestjs/common'
import { SampleTypeAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  SampleTypeRepositoryToken,
  IAuthContext,
  ISampleTypeRepository,
  assertPermission,
  TestRepositoryToken,
  ITestRepository,
  SampleRepositoryToken,
  ISampleRepository,
  EEntityCannotDelete,
} from 'src/domain'
import { SampleTypeAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleTypeDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleTypeRepositoryToken)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    @Inject(SampleRepositoryToken)
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
