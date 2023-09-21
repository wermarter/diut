import { ID_TEST_HCG } from '@diut/common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { PatientType } from 'src/resources/patient-types/patient-type.schema'
import { ExportHCGRequestDto } from '../dtos/export-hcg.request-dto'
import { BaseExportService } from './base-export.service'

@Injectable()
export class HCGService extends BaseExportService<ExportHCGRequestDto> {
  constructor(private sampleService: SampleService) {
    super(HCGService.name)
  }

  async prepareAOA(body: ExportHCGRequestDto) {
    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_HCG],
        body.startDate,
        body.endDate,
        ['patientId', 'patientTypeId']
      )
    )

    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'TG Nhận bệnh',
        'ID XN',
        'HỌ TÊN',
        'NS',
        'Địa chỉ',
        'Đối tượng',
        'Sinh phẩm',
        'Kết luận',
        'Ghi chú',
      ],
    ]

    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const patientType = sample.patientTypeId as PatientType
        const testResult = sample.results.find(
          ({ testId }) => testId === ID_TEST_HCG
        )
        const result = testResult?.elements?.[0]

        return [
          (sampleIndex + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          patient.name,
          patient.birthYear.toString(),
          patient.address,
          patientType.name,
          testResult?.bioProductName ?? '',
          result?.value ?? '',
          sample?.isTraBuuDien === true ? 'BĐ' : '',
        ]
      })
    )

    return aoaData
  }
}
