import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { AuthSubject, Sample, SampleAction, SampleResult } from '@diut/hcdc'

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
export class SampleUpdateResultUseCase {
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

  async execute(input: { filter: FilterQuery<Sample>; data: SampleResult }) {
    const entity = await this.sampleAssertExistsUseCase.execute(input.filter)
    const { ability, user } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.Sample,
      SampleAction.UpdateResult,
      entity,
    )
    await this.sampleValidateUseCase.execute(input.data)

    const modifiedResults: SampleResult['results'] = []
    const patientCategory = await this.patientGetCategoryUseCase.execute({
      patientId: entity.patientId,
    })

    const defaultResults = await this.sampleInitResultUseCase.execute({
      patientCategory,
      testIds: entity.results.map(({ testId }) => testId),
    })

    for (const testResult of entity.results) {
      const defaultResult = defaultResults.find(
        ({ testId }) => testId === testResult.testId,
      )!

      const newResult = input.data.results.find(
        ({ testId }) => testId === testResult.testId,
      )

      if (newResult !== undefined) {
        newResult.elements = defaultResult.elements.map((defaultElement) => {
          const newElementResult = newResult.elements.find(
            ({ testElementId }) =>
              testElementId === defaultElement.testElementId,
          )
          const existingElementResult = testResult.elements.find(
            ({ testElementId }) =>
              testElementId === defaultElement.testElementId,
          )

          return newElementResult ?? existingElementResult ?? defaultElement
        })

        modifiedResults.push({
          ...newResult,
          resultAt: new Date(),
          resultById: user._id,
        })
      } else {
        testResult.elements = defaultResult.elements.map((defaultElement) => {
          const existingElementResult = testResult.elements.find(
            ({ testElementId }) =>
              testElementId === defaultElement.testElementId,
          )

          return existingElementResult ?? defaultElement
        })

        modifiedResults.push(testResult)
      }
    }

    await this.sampleValidateUseCase.execute({ results: modifiedResults })

    return this.sampleRepository.update(input.filter, {
      results: modifiedResults,
    })
  }
}
