import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'
import { ReportType, Sample } from '@diut/hcdc'
import { Injectable, Scope } from '@nestjs/common'
import { format, parseISO } from 'date-fns'

import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { EEntityNotFound } from 'src/domain'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { TableConfig } from './common'

export type ReportExportTDDStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportTDDStrategy extends AbstractReportExportStrategy<
  ReportExportTDDStrategyInput,
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

    const testIds = reportConfig[ReportType.TDD]?.testIds
    if (testIds === undefined || testIds.length !== 1) {
      throw new EEntityNotFound(
        `branchId=${this.options.branchId} missing reportConfig for ${ReportType.TDD}`,
      )
    }

    const { samples, tests } = await this.reportQueryExportDataUseCase.execute({
      fromDate: this.options.fromDate,
      toDate: this.options.toDate,
      branchId: this.options.branchId,
      originIds: this.options.originIds,
      testIds,
    })

    return {
      items: samples,
      test: tests[0],
    }
  }

  async prepareTableConfig(): Promise<TableConfig<Sample>> {
    const { test, items } = await this.fetchData()

    return {
      name: `4 So KQ TDD (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
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
        ...test.elements.map(({ _id, name }) => ({
          columnId: _id,
          columnName: name,
          valueGetter(item: Sample) {
            const testResult = item.results.find((r) => r.testId === test._id)
            const elementResult = testResult?.elements.find(
              (r) => r.testElementId === _id,
            )

            return elementResult?.value ?? ''
          },
        })),
      ],
    }
  }
}
