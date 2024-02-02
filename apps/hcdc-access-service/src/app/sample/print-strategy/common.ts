import {
  ISampleRepository,
  ITestCategoryRepository,
  PrintTemplate,
  Sample,
  SampleResultTestElement,
  Test,
  TestCategory,
  TestElement,
} from 'src/domain'

export type AbstractPrintData = {
  sample: Sample
  categories: (TestCategory & {
    tests: (Test & {
      elements: (TestElement & SampleResultTestElement)[]
    })[]
  })[]
}

let data: AbstractPrintData

export interface ISamplePrintStrategy {
  preparePrintData(sampleId: string): Promise<unknown>
}

export abstract class AbstractSamplePrintStrategy
  implements ISamplePrintStrategy
{
  constructor(
    protected readonly sampleRepository: ISampleRepository,
    protected readonly testCategoryRepository: ITestCategoryRepository,
    protected readonly template: PrintTemplate,
  ) {}

  async preparePrintData(sampleId: string): Promise<AbstractPrintData> {
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

    const testCategoryIds = Array.from(
      new Set(sample.results.map(({ test }) => test?.testCategoryId!)),
    )

    const categories: AbstractPrintData['categories'] = []

    for (const testCategoryId of testCategoryIds) {
      const testCategory = (await this.testCategoryRepository.findOne({
        filter: { _id: testCategoryId },
      }))!

      const tests: AbstractPrintData['categories'][number]['tests'] = []
      const testResults = sample.results.filter(
        ({ test }) => test?.testCategoryId === testCategoryId,
      )

      for (const testResult of testResults) {
        const test = testResult.test!

        if (test.printForm?.template === this.template) {
          const elements: AbstractPrintData['categories'][number]['tests'][number]['elements'] =
            []

          for (const elementResult of testResult.elements) {
            if (elementResult.testElement) {
              elements.push({ ...elementResult.testElement, ...elementResult })
            }
          }

          if (elements.length > 0) {
            tests.push({
              ...test,
              elements: elements.toSorted(
                (a, b) => a.printIndex - b.printIndex,
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
