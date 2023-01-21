import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { TestService } from 'src/resources/tests/test.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { ExportTraKQRequestDto } from '../dtos/export-tra-kq.request-dto'
import { cringySort } from './utils'
import { TestCombo } from 'src/resources/test-combos/test-combo.schema'
import { TestComboService } from 'src/resources/test-combos/test-combo.service'
import { BaseExportService } from './base-export.service'

@Injectable()
export class TraKQService extends BaseExportService<ExportTraKQRequestDto> {
  constructor(
    private sampleService: SampleService,
    private testService: TestService,
    private testComboService: TestComboService
  ) {
    super(TraKQService.name)
  }

  async prepareAOA(body: ExportTraKQRequestDto) {
    // expand combos
    const comboTestIds: string[] = []
    const testCombos: TestCombo[] = []
    await Promise.all(
      body.testComboIds.map(async (comboId) => {
        const testCombo = await this.testComboService.findById(comboId)
        testCombos.push(testCombo)
        testCombo.children?.forEach((testId) =>
          comboTestIds.push(testId.toString())
        )
      })
    )

    // combine tests
    const testIds = Array.from(new Set([...comboTestIds, ...body.testIds]))
    const tests = await Promise.all(
      testIds.map((testId) => this.testService.findById(testId))
    )

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        testIds,
        body.startDate,
        body.endDate
      )
    )

    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'ID XN',
        'HỌ VÀ TÊN',
        'NS',
        'Ngày nhận mẫu',
        'XN yêu cầu',
        'Ngày trả KQ',
        'Người trả KQ',
        'Ghi chú',
      ],
    ]

    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient

        // filter tests
        const matchedTestIds = sample.results
          .map(({ testId }) => testId)
          .filter((testId) => testIds.includes(testId))

        const matchedCombos: TestCombo[] = []
        testCombos.forEach((combo) => {
          if (
            !combo.children.some(
              (testId) => !matchedTestIds.includes(testId.toString())
            )
          ) {
            matchedCombos.push(combo)
          }
        })

        const standaloneTestIds = matchedTestIds.filter((testId) =>
          body.testIds.includes(testId)
        )
        const standaloneTests = standaloneTestIds.map((testId) =>
          tests.find(({ _id }) => _id === testId)
        )

        // combine test name
        const testNames = [
          ...matchedCombos.map(({ name }) => name),
          ...standaloneTests.map(({ name }) => name),
        ]
        if (testNames.length === 0) {
          return null
        }

        return [
          (sampleIndex + 1).toString(),
          sample.sampleId,
          patient.name,
          patient.birthYear.toString(),
          sample.infoAt,
          testNames.join(', '),
          '',
          '',
          sample?.isTraBuuDien === true ? 'BĐ' : '',
        ]
      })
    )

    return aoaData.filter((rowArray) => rowArray != null)
  }

  exportWorksheet(body: ExportTraKQRequestDto) {
    return this.exportWorksheetDateOnly(body)
  }
}
