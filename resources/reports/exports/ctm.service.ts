import { Gender, ID_TEST_CTM } from '@diut/hcdc'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { PatientType } from 'src/resources/patient-types/patient-type.schema'
import { BaseExportService } from './base-export.service'
import { ExportCTMRequestDto } from '../dtos/export-ctm.request-dto'

@Injectable()
export class CTMService extends BaseExportService<ExportCTMRequestDto> {
  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService,
  ) {
    super(CTMService.name)
  }

  async prepareAOA(body: ExportCTMRequestDto) {
    const testElements = await this.testElementService.getElementsForTestReport(
      [ID_TEST_CTM],
    )

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_CTM],
        body.startDate,
        body.endDate,
        ['patientId', 'patientTypeId'],
      ),
    )

    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'TG Nhận bệnh',
        'ID XN',
        'HỌ TÊN',
        'Nam',
        'Nữ',
        'Đối tượng',
        ...testElements.map(({ name }) => name),
        'Ghi chú',
      ],
    ]

    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const patientType = sample.patientTypeId as PatientType
        const elementResults =
          sample.results.find(({ testId }) => testId === ID_TEST_CTM)
            ?.elements ?? []

        return [
          (sampleIndex + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          patient.name,
          patient.gender === Gender.Male ? patient.birthYear.toString() : '',
          patient.gender === Gender.Female ? patient.birthYear.toString() : '',
          patientType.name,
          ...testElements.map((testElement) => {
            const result = elementResults.find(
              ({ id }) => id === testElement._id,
            )

            return result?.value ?? ''
          }),
          sample?.isTraBuuDien === true ? 'BĐ' : '',
        ]
      }),
    )

    return aoaData
  }
}
