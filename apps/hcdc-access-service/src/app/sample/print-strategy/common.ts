import {
  PrintTemplate,
  Sample,
  SampleResultTestElement,
  Test,
  TestCategory,
} from '@diut/hcdc'

import { ISampleRepository, ITestCategoryRepository } from 'src/domain'

export type SamplePrintData = {
  sample: Sample
  categories: (TestCategory & {
    tests: (Test & {
      bioProductName?: string
      instrumentName?: string
      elements: SampleResultTestElement[]
    })[]
  })[]
}

export interface ISamplePrintStrategy {
  preparePrintData(
    sampleId: string,
    testIds: string[],
  ): Promise<SamplePrintData>
}

export abstract class AbstractSamplePrintStrategy
  implements ISamplePrintStrategy
{
  constructor(
    protected readonly sampleRepository: ISampleRepository,
    protected readonly testCategoryRepository: ITestCategoryRepository,
    protected readonly template: PrintTemplate,
  ) {}

  async preparePrintData(
    sampleId: string,
    testIds: string[],
  ): Promise<SamplePrintData> {
    const sample = (await this.sampleRepository.findOne({
      filter: { _id: sampleId },
      populates: [
        {
          path: 'patient',
        },
        {
          path: 'doctor',
        },
        {
          path: 'patientType',
        },
        {
          path: 'diagnosis',
        },
        {
          path: 'origin',
        },
        {
          path: 'sampleTypes',
        },
        {
          path: 'branch',
        },
        {
          path: 'results.test',
          populate: { path: 'printForm', match: { isDeleted: false } },
        },
        {
          path: 'results.elements.testElement',
        },
      ],
    }))!

    sample.results = sample.results.filter(({ testId }) =>
      testIds.includes(testId),
    )

    const testCategoryIds = Array.from(
      new Set(sample.results.map(({ test }) => test?.testCategoryId)),
    )

    const categories: SamplePrintData['categories'] = []

    for (const testCategoryId of testCategoryIds) {
      const testCategory = (await this.testCategoryRepository.findOne({
        filter: { _id: testCategoryId },
      }))!

      const tests: SamplePrintData['categories'][number]['tests'] = []
      const testResults = sample.results.filter(
        ({ test }) => test?.testCategoryId === testCategoryId,
      )

      for (const testResult of testResults) {
        const test = testResult.test!

        if (test.printForm?.template === this.template) {
          const elements: SamplePrintData['categories'][number]['tests'][number]['elements'] =
            []

          for (const elementResult of testResult.elements) {
            if (elementResult.testElement) {
              elements.push(elementResult)
            }
          }

          if (elements.length > 0) {
            tests.push({
              ...test,
              bioProductName: testResult.bioProductName,
              instrumentName: testResult.instrumentName,
              elements: elements.toSorted(
                (a, b) =>
                  a.testElement?.printIndex! - b.testElement?.printIndex!,
              ),
            })
          }
        }
      }

      if (tests.length > 0) {
        categories.push({
          ...testCategory,
          tests: tests.toSorted((a, b) => a.displayIndex - b.displayIndex),
        })
      }
    }

    return {
      sample,
      categories: categories.toSorted(
        (a, b) => a.displayIndex - b.displayIndex,
      ),
    }
  }
}
