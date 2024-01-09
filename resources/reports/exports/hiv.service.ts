import { Gender, ID_TEST_HIV } from '@diut/hcdc-common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { PatientType } from 'src/resources/patient-types/patient-type.schema'
import { BaseExportService } from './base-export.service'
import { ExportHIVRequestDto } from '../dtos/export-hiv.request-dto'

@Injectable()
export class HIVService extends BaseExportService<ExportHIVRequestDto> {
  constructor(private sampleService: SampleService) {
    super(HIVService.name)
  }

  async prepareAOA(body: ExportHIVRequestDto) {
    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_HIV],
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
        'Địa chỉ',
        'Đối tượng',
        'Ngày/Giờ XN',
        'Sinh phẩm',
        'Kết luận',
        'KQ khẳng định',
        'Ghi chú',
      ],
    ]

    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const patientType = sample.patientTypeId as PatientType
        const testResult = sample.results.find(
          ({ testId }) => testId === ID_TEST_HIV,
        )

        return [
          (sampleIndex + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          patient.name,
          patient.gender === Gender.Male ? patient.birthYear.toString() : '',
          patient.gender === Gender.Female ? patient.birthYear.toString() : '',
          patient?.address,
          patientType.name,
          testResult?.resultAt,
          testResult?.bioProductName,
          testResult?.elements?.[0]?.value,
          '',
          sample?.isTraBuuDien === true ? 'BĐ' : '',
        ]
      }),
    )

    return aoaData
  }
}
