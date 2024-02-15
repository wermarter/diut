import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { AuthSubject, Sample, SampleAction, SampleInfo } from '@diut/hcdc'

import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
  assertPermission,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleValidateUseCase } from './validate'
import { SampleInitResultUseCase } from './init-result'
import { PatientGetCategoryUseCase } from '../../patient/use-case/get-category'

@Injectable()
export class SampleUpdateInfoUseCase {
  constructor(
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly sampleValidateUseCase: SampleValidateUseCase,
    private readonly sampleInitResultUseCase: SampleInitResultUseCase,
    private readonly patientGetCategoryUseCase: PatientGetCategoryUseCase,
  ) {}

  async execute(input: {
    filter: FilterQuery<Sample>
    data: UpdateQuery<SampleInfo & Pick<Sample, 'isConfirmed'>> & {
      addedTestIds?: string[]
      removedTestIds?: string[]
    }
  }) {
    const entity = await this.sampleAssertExistsUseCase.execute(input.filter)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Sample,
      SampleAction.UpdateInfo,
      entity,
    )

    let modifiedResults = entity.results

    if (input.data.removedTestIds?.length) {
      modifiedResults = entity.results.filter(
        ({ testId }) => !input.data.removedTestIds?.includes(testId),
      )
    }

    const newTestIds = (input.data.addedTestIds ?? []).filter((addedTestId) =>
      entity.results.every(({ testId }) => testId !== addedTestId),
    )

    if (newTestIds.length > 0) {
      const patientCategory = await this.patientGetCategoryUseCase.execute({
        patientId: entity.patientId,
      })

      const newResults = await this.sampleInitResultUseCase.execute({
        testIds: newTestIds,
        patientCategory,
      })

      modifiedResults.push(...newResults)
    }

    input.data.results = modifiedResults

    await this.sampleValidateUseCase.execute(input.data)

    return this.sampleRepository.update(input.filter, input.data)
  }
}
