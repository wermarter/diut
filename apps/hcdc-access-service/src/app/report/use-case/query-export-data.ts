import {
  Sample,
  Test,
  TestCombo,
  TestElement,
  cringySortCompareFn,
} from '@diut/hcdc'
import { PopulateConfig } from '@diut/nestjs-infra'
import { Injectable } from '@nestjs/common'
import { parseISO } from 'date-fns'
import { SampleSearchUseCase } from 'src/app/sample/use-case/search'
import { TestComboSearchUseCase } from 'src/app/test-combo/use-case/search'
import { TestElementSearchUseCase } from 'src/app/test-element/use-case/search'
import { TestSearchUseCase } from 'src/app/test/use-case/search'
import { SearchResult } from 'src/domain'

@Injectable()
export class ReportQueryExportDataUseCase {
  constructor(
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    private readonly testSearchUseCase: TestSearchUseCase,
    private readonly testElementSearchUseCase: TestElementSearchUseCase,
    private readonly testComboSearchUseCase: TestComboSearchUseCase,
  ) {}

  async execute(input: {
    fromDate: string
    toDate: string
    branchId: string
    testIds: string[]
    originIds?: string[]
    patientTypeIds?: string[]
    testComboIds?: string[]
    populates?: PopulateConfig<Sample>[]
  }) {
    const testCombos: TestCombo[] = []
    let testIds = Array.from(input.testIds)

    if (input.testComboIds !== undefined) {
      const { items } = await this.testComboSearchUseCase.execute({
        filter: { _id: { $in: input.testComboIds } },
      })
      items.map((testCombo) => {
        testCombos.push(testCombo)
        testIds.push(...testCombo.testIds)
      })
    }
    testIds = Array.from(new Set(testIds))

    const { items: tests } = (await this.testSearchUseCase.execute({
      filter: { _id: { $in: testIds } },
      sort: { displayIndex: 1 },
    })) as SearchResult<Test & { elements: TestElement[] }>

    for (const test of tests) {
      const { items } = await this.testElementSearchUseCase.execute({
        filter: { testId: test._id, reportIndex: { $gt: 0 } },
        sort: { reportIndex: 1 },
      })
      test.elements = items
    }

    const { items: samples } = await this.sampleSearchUseCase.execute({
      filter: {
        infoAt: {
          $gte: parseISO(input.fromDate),
          $lte: parseISO(input.toDate),
        },
        branchId: input.branchId,
        ...(testIds.length > 0 && {
          results: {
            $elemMatch: {
              testId: { $in: testIds },
              // isLocked: true,
            },
          },
        }),
        ...(input.patientTypeIds?.length! > 0 && {
          patientTypeId: { $in: input.patientTypeIds },
        }),
        ...(input.originIds?.length! > 0 && {
          originId: { $in: input.originIds },
        }),
      },
      populates: (input.populates ?? []).concat([{ path: 'patient' }]),
    })

    return { samples: samples.toSorted(cringySortCompareFn), tests, testCombos }
  }
}
