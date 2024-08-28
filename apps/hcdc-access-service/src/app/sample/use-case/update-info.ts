import { AuthSubject, Sample, SampleAction, SampleInfo } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery, UpdateQuery } from 'mongoose'

import { assertPermission } from 'src/app/auth/common'
import { PatientGetCategoryUseCase } from 'src/app/patient/use-case/get-category'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleInitResultUseCase } from './init-result'
import { SampleValidateUseCase } from './validate'

@Injectable()
export class SampleUpdateInfoUseCase {
  constructor(
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
