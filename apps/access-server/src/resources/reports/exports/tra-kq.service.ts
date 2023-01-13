import { DATEONLY_FORMAT } from '@diut/common'
import { Injectable, Logger } from '@nestjs/common'
import * as xlsx from 'xlsx'
import { format } from 'date-fns'

import { SampleService } from 'src/resources/samples/sample.service'
import { TestService } from 'src/resources/tests/test.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { ExportTraKQRequestDto } from '../dtos/export-tra-kq.request-dto'

@Injectable()
export class TraKQService {
  private logger: Logger

  constructor(
    private sampleService: SampleService,
    private testService: TestService
  ) {
    this.logger = new Logger(TraKQService.name)
  }

  async prepareAOA(body: ExportTraKQRequestDto) {
    const tests = await Promise.all(
      body.testIds.map((testId) => this.testService.findById(testId))
    )
    const samples = (
      await this.sampleService.search({
        filter: {
          infoAt: {
            $gte: body.startDate,
            $lte: body.endDate,
          },
          results: {
            $elemMatch: {
              testId: {
                $in: body.testIds,
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

    // header
    const aoaData = [
      [
        'STT',
        'ID XN',
        'HỌ VÀ TÊN',
        'NS',
        'Ngày nhận mẫu',
        'XN yêu cầu',
        'Ngày trả KQ', // empty
        'Người trả KQ', // empty
        'Ghi chú', // Bưu điện ? BĐ : ''
      ],
    ]

    // test element result
    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient

        const selectedResults = sample.results.filter(({ testId }) =>
          body.testIds.includes(testId)
        )

        const selectedTests = selectedResults.map(({ testId }) =>
          tests.find((test) => test._id.toString() === testId)
        )

        return [
          (sampleIndex + 1).toString(),
          sample.sampleId,
          patient.name,
          patient.birthYear.toString(),
          format(sample.infoAt, DATEONLY_FORMAT),
          selectedTests.map(({ name }) => name).join(', '),
          '',
          '',
          sample?.isTraBuuDien === true ? 'BĐ' : '',
        ]
      })
    )

    return aoaData
  }

  async exportWorksheet(body: ExportTraKQRequestDto) {
    const aoaData = await this.prepareAOA(body)
    const worksheet = xlsx.utils.aoa_to_sheet(aoaData)

    return worksheet
  }
}
