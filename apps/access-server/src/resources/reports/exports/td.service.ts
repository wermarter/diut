import { ID_TEST_TD } from '@diut/common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { ExportTDRequestDto } from '../dtos/export-td.request-dto'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { BaseExportService } from './base-export.service'

@Injectable()
export class TDService extends BaseExportService<ExportTDRequestDto> {
  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService
  ) {
    super(TDService.name)
  }

  async prepareAOA(body: ExportTDRequestDto) {
    const testElements = await this.testElementService.getElementsForTestReport(
      [ID_TEST_TD]
    )

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_TD],
        body.startDate,
        body.endDate
      )
    )

    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'TG Nhận bệnh',
        'ID XN',
        'HỌ TÊN',
        'NS',
        ...testElements.map(({ name }) => name),
      ],
    ]

    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const elementResults =
          sample.results.find(({ testId }) => testId === ID_TEST_TD)
            ?.elements ?? []

        return [
          (sampleIndex + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          patient.name,
          patient.birthYear.toString(),
          ...testElements.map((testElement) => {
            const result = elementResults.find(
              ({ id }) => id === testElement._id
            )

            return result?.value ?? ''
          }),
        ]
      })
    )

    return aoaData
  }
}
