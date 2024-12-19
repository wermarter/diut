import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'
import { ReportType, Sample } from '@diut/hcdc'
import { Injectable, Scope } from '@nestjs/common'
import { format, parseISO } from 'date-fns'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { EEntityNotFound } from 'src/domain'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { TableConfig } from './common'

export type ReportExportSoiNhuomStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}

const CLUE_CELL_POSITION = 2

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportSoiNhuomStrategy extends AbstractReportExportStrategy<
  ReportExportSoiNhuomStrategyInput,
  unknown
> {
  constructor(
    private readonly reportQueryExportDataUseCase: ReportQueryExportDataUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {
    super()
  }

  async fetchData() {
    const { reportConfig } = await this.branchAssertExistsUseCase.execute({
      _id: this.options.branchId,
    })
    const testIds = reportConfig[ReportType.SoiNhuom]?.testIds
    if (testIds === undefined || testIds.length !== 2) {
      throw new EEntityNotFound(
        `branchId=${this.options.branchId} missing reportConfig for ${ReportType.SoiNhuom}`,
      )
    }
    const [htTestId, dmTestId] = testIds

    const { samples, tests } = await this.reportQueryExportDataUseCase.execute({
      fromDate: this.options.fromDate,
      toDate: this.options.toDate,
      branchId: this.options.branchId,
      originIds: this.options.originIds,
      testIds,
    })

    const htTest = tests.find(({ _id }) => _id === htTestId)!
    const dmTest = tests.find(({ _id }) => _id === dmTestId)!

    return {
      items: samples,
      htTest,
      dmTest,
    }
  }

  async prepareTableConfig(): Promise<TableConfig<Sample>> {
    const { htTest, dmTest, items } = await this.fetchData()
    const abnormalCounterMap: Record<string, number> = {}

    return {
      name: `2 So KQ Soi Nhuom (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
      items,
      dateNF: DATETIME_FORMAT,
      columns: [
        {
          columnId: 'index',
          columnName: 'STT',
        },
        {
          columnId: 'infoAt',
          columnName: 'TG Nhận bệnh',
          valueGetter(item) {
            return item.infoAt
          },
        },
        {
          columnId: 'sampleId',
          columnName: 'ID XN',
          valueGetter(item) {
            return item.sampleId
          },
        },
        {
          columnId: 'patientName',
          columnName: 'HỌ TÊN',
          valueGetter(item) {
            return item.patient?.name
          },
        },
        {
          columnId: 'patientBirthYear',
          columnName: 'NS',
          valueGetter(item) {
            return item.patient?.birthYear ?? ''
          },
        },
        ...htTest.elements.map(
          ({ _id: htElementId, name }, htElementIndex) => ({
            columnId: htElementId,
            columnName: name,
            valueGetter(item: Sample) {
              const htTestResult = item.results.find(
                (r) => r.testId === htTest._id,
              )
              if (htTestResult) {
                const htElementResult = htTestResult.elements.find(
                  (r) => r.testElementId === htElementId,
                )

                if (htElementResult?.isAbnormal === true) {
                  if (abnormalCounterMap[htElementIndex] === undefined) {
                    abnormalCounterMap[htElementIndex] = 0
                  }
                  abnormalCounterMap[htElementIndex]++
                }

                return htElementResult?.value ?? ''
              } else {
                if (htElementIndex === CLUE_CELL_POSITION) {
                  return ''
                }

                let translatedIndex = htElementIndex
                if (htElementIndex > CLUE_CELL_POSITION) {
                  translatedIndex = htElementIndex - 1
                }

                const dmTestResult = item.results.find(
                  (r) => r.testId === dmTest._id,
                )!
                const dmElement = dmTest.elements[translatedIndex]
                const dmElementResult = dmTestResult.elements.find(
                  (r) => r.testElementId === dmElement._id,
                )

                if (dmElementResult?.isAbnormal === true) {
                  if (abnormalCounterMap[htElementIndex] === undefined) {
                    abnormalCounterMap[htElementIndex] = 0
                  }
                  abnormalCounterMap[htElementIndex]++
                }

                return dmElementResult?.value ?? ''
              }
            },
            summaryGetter() {
              const abnormalCounter = abnormalCounterMap[htElementIndex]
              return abnormalCounter > 0 ? abnormalCounter : ''
            },
          }),
        ),
      ],
    }
  }
}
