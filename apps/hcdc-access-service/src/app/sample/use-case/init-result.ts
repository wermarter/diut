import { Injectable } from '@nestjs/common'

import { PatientCategory, Sample, Test } from '@diut/hcdc'
import { TestSearchUseCase } from '../../test/use-case/search'
import { TestElementSearchUseCase } from '../../test-element/use-case/search'
import { EEntityNotFound } from 'src/domain'

@Injectable()
export class SampleInitResultUseCase {
  constructor(
    private readonly testSearchUseCase: TestSearchUseCase,
    private readonly testElementSearchUseCase: TestElementSearchUseCase,
  ) {}

  async execute(input: {
    patientCategory: PatientCategory
    testIds: string[]
  }) {
    const results: Sample['results'] = []

    if (input.testIds.length > 0) {
      const tests: Test[] = (
        await this.testSearchUseCase.execute({
          filter: {
            _id: { $in: input.testIds },
          },
          populates: [{ path: 'bioProduct' }, { path: 'instrument' }],
        })
      ).items

      input.testIds.forEach((testId) => {
        if (!tests.some(({ _id }) => _id === testId)) {
          throw new EEntityNotFound(`Test { _id = ${testId} }`)
        }
      })

      const testElements = await Promise.all(
        tests.map((test) =>
          this.testElementSearchUseCase
            .execute({
              filter: { testId: test._id },
              projection: { _id: 1, normalRules: 1 },
            })
            .then((data) => data.items),
        ),
      )

      tests.forEach((test, index) => {
        results.push({
          testId: test._id,
          isLocked: false,
          bioProductName: test.bioProduct?.name,
          instrumentName: test.instrument?.name,
          elements: testElements[index].map((element) => ({
            testElementId: element._id,
            value: '',
            isAbnormal:
              element.normalRules.find(
                ({ category }) => category === input.patientCategory,
              )?.defaultChecked ??
              element.normalRules.find(
                ({ category }) => category === PatientCategory.Any,
              )?.defaultChecked ??
              false,
          })),
        })
      })
    }

    return results
  }
}
