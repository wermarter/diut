import { Gender, ID_TEST_URINE10 } from '@diut/hcdc-common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { PatientType } from 'src/resources/patient-types/patient-type.schema'
import { ExportUrine10RequestDto } from '../dtos/export-urine-10.request-dto'
import { BaseExportService } from './base-export.service'

@Injectable()
export class Urine10Service extends BaseExportService<ExportUrine10RequestDto> {
  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService,
  ) {
    super(Urine10Service.name)
  }

  async prepareAOA(body: ExportUrine10RequestDto) {
    const testElements = await this.testElementService.getElementsForTestReport(
      [ID_TEST_URINE10],
    )

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_URINE10],
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
          sample.results.find(({ testId }) => testId === ID_TEST_URINE10)
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
