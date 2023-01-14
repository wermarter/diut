import { DATEONLY_FORMAT } from '@diut/common'
import { Injectable, Logger } from '@nestjs/common'
import * as xlsx from 'xlsx'

import { SampleService } from 'src/resources/samples/sample.service'
import { TestService } from 'src/resources/tests/test.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { ExportTraKQRequestDto } from '../dtos/export-tra-kq.request-dto'
import { cringySort } from './utils'
import { TestCombo } from 'src/resources/test-combos/test-combo.schema'
import { TestComboService } from 'src/resources/test-combos/test-combo.service'

@Injectable()
export class TraKQService {
  private logger: Logger

  constructor(
    private sampleService: SampleService,
    private testService: TestService,
    private testComboService: TestComboService
  ) {
    this.logger = new Logger(TraKQService.name)
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
      (
        await this.sampleService.search({
          filter: {
            infoAt: {
              $gte: body.startDate,
              $lte: body.endDate,
            },
            results: {
              $elemMatch: {
                testId: {
                  $in: testIds,
                },
              },
            },
          },
          sort: {
            infoAt: 1,
            sampleId: 1,
          },
          populates: [
            {
              path: 'patientId',
            },
          ],
        })
      ).items
    )

    // header
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

    // test element result
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
          tests.find(({ _id }) => _id.toString() === testId)
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

  async exportWorksheet(body: ExportTraKQRequestDto) {
    const aoaData = await this.prepareAOA(body)
    const worksheet = xlsx.utils.aoa_to_sheet(aoaData, {
      dateNF: DATEONLY_FORMAT,
    })

    return worksheet
  }
}
