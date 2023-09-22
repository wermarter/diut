import {
  ID_TEST_SOINHUOM_DM,
  ID_TEST_SOINHUOM_HT,
} from '@diut/bathanghai-common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { ExportSoiNhuomRequestDto } from '../dtos/export-soi-nhuom.request-dto'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { BaseExportService } from './base-export.service'

const CLUE_CELL_POSITION = 2

@Injectable()
export class SoiNhuomService extends BaseExportService<ExportSoiNhuomRequestDto> {
  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService,
  ) {
    super(SoiNhuomService.name)
  }

  async prepareAOA(body: ExportSoiNhuomRequestDto) {
    const testElementsHT =
      await this.testElementService.getElementsForTestReport([
        ID_TEST_SOINHUOM_HT,
      ])
    const testElementsDM =
      await this.testElementService.getElementsForTestReport([
        ID_TEST_SOINHUOM_DM,
      ])

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_SOINHUOM_HT, ID_TEST_SOINHUOM_DM],
        body.startDate,
        body.endDate,
      ),
    )

    // init summation values
    const abnormalCounters: { [elementId: string]: number } = {}
    testElementsHT.forEach(({ _id }) => {
      abnormalCounters[_id] = 0
    })
    const summaryRow = ['', '', '', '', '']

    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'TG Nhận bệnh',
        'ID XN',
        'HỌ TÊN',
        'NS',
        ...testElementsHT.map(({ name }) => name),
      ],
    ]

    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const testResult = sample.results.find(
          ({ testId }) =>
            testId === ID_TEST_SOINHUOM_HT || testId === ID_TEST_SOINHUOM_DM,
        )
        const isSoiNhuomHT = testResult.testId === ID_TEST_SOINHUOM_HT
        const testResultElements = testResult?.elements ?? []

        return [
          (sampleIndex + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          patient.name,
          patient.birthYear.toString(),
          ...testElementsHT.map(({ _id }, elementIndex) => {
            if (isSoiNhuomHT) {
              const elementResult = testResultElements?.find(
                ({ id }) => id === _id,
              )
              if (elementResult?.isHighlighted === true) {
                abnormalCounters[_id]++
              }

              return elementResult?.value ?? ''
            } else {
              if (elementIndex === CLUE_CELL_POSITION) {
                return ''
              }

              let translatedIndex = elementIndex
              if (elementIndex > CLUE_CELL_POSITION) {
                translatedIndex = elementIndex - 1
              }

              const elementResult = testResultElements?.find(
                ({ id }) => id === testElementsDM[translatedIndex]._id,
              )
              if (elementResult?.isHighlighted === true) {
                abnormalCounters[_id]++
              }

              return elementResult?.value ?? ''
            }
          }),
        ]
      }),
    )

    // compile summary row
    summaryRow.push(
      ...Object.keys(abnormalCounters).map((key) =>
        abnormalCounters[key].toString(),
      ),
    )
    aoaData.push([], summaryRow)

    return aoaData
  }
}
