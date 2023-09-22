import { ID_TEST_PAPSMEAR } from '@diut/bathanghai-common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { BaseExportService } from './base-export.service'
import { ExportPapsmearRequestDto } from '../dtos/export-papsmear.request-dto'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { UserService } from 'src/resources/users/user.service'

@Injectable()
export class PapsmearService extends BaseExportService<ExportPapsmearRequestDto> {
  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService,
    private userService: UserService,
  ) {
    super(PapsmearService.name)
  }

  async prepareAOA(body: ExportPapsmearRequestDto) {
    const [paraElement, chanDoanElement, ketLuanElement] =
      await this.testElementService.getElementsForTestReport([ID_TEST_PAPSMEAR])

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        [ID_TEST_PAPSMEAR],
        body.startDate,
        body.endDate,
      ),
    )

    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'TG Nhận bệnh',
        'ID XN',
        'HỌ TÊN',
        'NS',
        'SĐT',
        'Địa chỉ',
        paraElement.name,
        chanDoanElement.name,
        'Ngày XN',
        'KQ Đọc',
        'Người thực hiện',
        'KQ Hội chẩn',
        'Người cùng hội chẩn',
        'Ghi chú',
      ],
    ]

    let sampleIndex = 0
    for (const sample of samples) {
      const patient = sample.patientId as Patient
      const testResult = sample.results.find(
        ({ testId }) => testId === ID_TEST_PAPSMEAR,
      )
      const author = await this.userService.findById(testResult?.resultBy)

      const paraResult =
        testResult?.elements?.find(({ id }) => id === paraElement._id)?.value ??
        ''
      const chanDoanResult =
        testResult?.elements?.find(({ id }) => id === chanDoanElement._id)
          ?.value ?? ''
      const ketLuanResult =
        testResult?.elements?.find(({ id }) => id === ketLuanElement._id)
          ?.value ?? ''

      aoaData.push([
        (++sampleIndex).toString(),
        sample.infoAt,
        sample.sampleId,
        patient.name,
        patient.birthYear.toString(),
        patient.phoneNumber,
        patient.address,
        paraResult,
        chanDoanResult,
        testResult?.resultAt,
        ketLuanResult,
        author?.name ?? '',
        '',
        '',
        sample?.isTraBuuDien === true ? 'BĐ' : '',
      ])
    }

    return aoaData
  }
}
