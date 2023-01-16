import {
  DATETIME_FORMAT,
  ID_TEST_SOINHUOM_DM,
  ID_TEST_SOINHUOM_HT,
} from '@diut/common'
import { Injectable, Logger } from '@nestjs/common'
import * as xlsx from 'xlsx'

import { SampleService } from 'src/resources/samples/sample.service'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { ExportSoiNhuomRequestDto } from '../dtos/export-soi-nhuom.request-dto'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'

const CLUE_CELL_POSITION = 2

@Injectable()
export class SoiNhuomService {
  private logger: Logger

  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService
  ) {
    this.logger = new Logger(SoiNhuomService.name)
  }

  async prepareAOA(body: ExportSoiNhuomRequestDto) {
    const testElementsHT = (
      await this.testElementService.search({
        filter: {
          test: ID_TEST_SOINHUOM_HT,
        },
        sort: {
          reportOrder: 1,
        },
      })
    ).items
    const testElementsDM = (
      await this.testElementService.search({
        filter: {
          test: ID_TEST_SOINHUOM_DM,
        },
        sort: {
          reportOrder: 1,
        },
      })
    ).items
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
                  $in: [ID_TEST_SOINHUOM_HT, ID_TEST_SOINHUOM_DM],
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

    // init summation values
    const irregularCounters: { [elementId: string]: number } = {}
    testElementsHT.forEach(({ _id }) => {
      irregularCounters[_id] = 0
    })
    const summaryRow = ['', '', '', '', '']

    // header
    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'Ngày/Giờ XN',
        'ID XN',
        'HỌ TÊN',
        'NS',
        ...testElementsHT.map(({ name }) => name),
      ],
    ]

    // test element result
    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const testResult = sample.results.find(
          ({ testId }) =>
            testId === ID_TEST_SOINHUOM_HT || testId === ID_TEST_SOINHUOM_DM
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
                ({ id }) => id === _id.toString()
              )
              if (elementResult?.isHighlighted === true) {
                irregularCounters[_id]++
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
                ({ id }) =>
                  id === testElementsDM[translatedIndex]._id.toString()
              )
              if (elementResult.isHighlighted === true) {
                irregularCounters[_id]++
              }

              return elementResult?.value ?? ''
            }
          }),
        ]
      })
    )

    // compile summary row
    summaryRow.push(
      ...Object.keys(irregularCounters).map((key) =>
        irregularCounters[key].toString()
      )
    )
    aoaData.push([], summaryRow)

    return aoaData
  }

  async exportWorksheet(body: ExportSoiNhuomRequestDto) {
    const aoaData = await this.prepareAOA(body)
    const worksheet = xlsx.utils.aoa_to_sheet(aoaData, {
      dateNF: DATETIME_FORMAT,
    })

    return worksheet
  }
}
