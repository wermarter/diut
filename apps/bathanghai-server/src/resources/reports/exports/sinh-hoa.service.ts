import {
  Gender,
  ID_TEST_RHESUS,
  ID_TEST_DUONG75,
  ID_TEST_HBSAG,
  ID_TEST_ANTIHBS,
  ID_TEST_GIANGMAI,
  ID_TEST_HBEAG,
  ID_TEST_IGM,
  ID_TEST_IGG,
  ID_TEST_HBA1C,
  ID_TEST_AST,
  ID_TEST_ALT,
  ID_TEST_FERRITIN,
  ID_TEST_FT4,
  ID_TEST_CHOLES,
  ID_TEST_TRIGLY,
  ID_TEST_HDL,
  ID_TEST_LDL,
  ID_TEST_DOUBLE,
  ID_TEST_TRIPLE,
  ID_TEST_PROLACTIN,
  ID_TEST_PROCALCI,
  ID_TEST_TESTOS,
  ID_TEST_ESTRA,
  ID_TEST_TQ,
  ID_TEST_TCK,
  ID_TEST_FIBRI,
  ID_TEST_DIENDI,
  ID_TEST_GLUCOSE,
  ID_TEST_NHOMMAU,
} from '@diut/bathanghai-common'
import { Injectable } from '@nestjs/common'

import { SampleService } from 'src/resources/samples/sample.service'
import { Patient } from 'src/resources/patients/patient.schema'
import { cringySort } from './utils'
import { TestElementService } from 'src/resources/test-elements/test-element.service'
import { Test } from 'src/resources/tests/test.schema'
import { Sample } from 'src/resources/samples/sample.schema'
import { BaseExportService } from './base-export.service'
import { ExportSinhHoaRequestDto } from '../dtos/export-sinh-hoa.request-dto'

const TEST_IDS = [
  ID_TEST_GLUCOSE,
  ID_TEST_DUONG75,
  ID_TEST_HBSAG,
  ID_TEST_ANTIHBS,
  ID_TEST_GIANGMAI,
  ID_TEST_HBEAG,
  ID_TEST_IGM,
  ID_TEST_IGG,
  ID_TEST_HBA1C,
  ID_TEST_AST,
  ID_TEST_ALT,
  ID_TEST_FERRITIN,
  ID_TEST_FT4,
  ID_TEST_CHOLES,
  ID_TEST_TRIGLY,
  ID_TEST_HDL,
  ID_TEST_LDL,
  ID_TEST_DOUBLE,
  ID_TEST_TRIPLE,
  ID_TEST_PROLACTIN,
  ID_TEST_PROCALCI,
  ID_TEST_TESTOS,
  ID_TEST_ESTRA,
  ID_TEST_TQ,
  ID_TEST_TCK,
  ID_TEST_FIBRI,
  ID_TEST_DIENDI,
  ID_TEST_RHESUS,
  ID_TEST_NHOMMAU,
]

@Injectable()
export class SinhHoaService extends BaseExportService<ExportSinhHoaRequestDto> {
  constructor(
    private sampleService: SampleService,
    private testElementService: TestElementService,
  ) {
    super(SinhHoaService.name)
  }

  async prepareAOA(body: ExportSinhHoaRequestDto) {
    const testElements = (
      await this.testElementService.getElementsForTestReport(TEST_IDS)
    ) // Sort by test order in TEST_IDS and reportOrder
      .sort((elementA, elementB) => {
        const testIndexA = TEST_IDS.findIndex(
          (id) => id === (elementA.test as Test)._id.toString(),
        )
        const testIndexB = TEST_IDS.findIndex(
          (id) => id === (elementB.test as Test)._id.toString(),
        )

        const testIndexDelta = testIndexA - testIndexB
        if (testIndexDelta !== 0) {
          return testIndexDelta
        }

        return elementA.reportOrder - elementB.reportOrder
      })

    const samples = cringySort(
      await this.sampleService.getSamplesForTestReport(
        TEST_IDS,
        body.startDate,
        body.endDate,
      ),
    )

    // header
    const aoaData: Array<Array<string | Date>> = [
      [
        'STT',
        'TG Nhận bệnh',
        'ID XN',
        'HỌ TÊN',
        'Nam',
        'Nữ',
        ...testElements.map(
          ({ name, test }) => `${(test as Test).name} - ${name}`,
        ),
        'Ghi chú',
      ],
    ]

    // test element result
    aoaData.push(
      ...samples.map((sample, sampleIndex) => {
        const patient = sample.patientId as Patient
        const elementResults: Sample['results'][number]['elements'] = []
        sample.results
          .filter(({ testId }) => TEST_IDS.includes(testId))
          .forEach((testResult) => {
            testResult.elements.forEach((elementResult) =>
              elementResults.push(elementResult),
            )
          })

        return [
          (sampleIndex + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          patient.name,
          patient.gender === Gender.Male ? patient.birthYear.toString() : '',
          patient.gender === Gender.Female ? patient.birthYear.toString() : '',
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
