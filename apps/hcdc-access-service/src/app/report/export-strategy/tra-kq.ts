import { DATEONLY_FORMAT } from '@diut/common'
import { Sample, separateTestCombo } from '@diut/hcdc'
import { Injectable, Scope } from '@nestjs/common'
import { format, parseISO } from 'date-fns'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import {
  AbstractReportExportStrategy,
  SKIP_LINE_EXCEPTION,
} from './abstract-strategy'
import { TableConfig } from './common'

export type ReportExportTraKQStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
  testIds: string[]
  testComboIds: string[]
  patientTypeIds: string[]
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportTraKQStrategy extends AbstractReportExportStrategy<
  ReportExportTraKQStrategyInput,
  unknown
> {
  constructor(
    private readonly reportQueryExportDataUseCase: ReportQueryExportDataUseCase,
  ) {
    super()
  }

  async fetchData() {
    const { samples, tests, testCombos } =
      await this.reportQueryExportDataUseCase.execute({
        fromDate: this.options.fromDate,
        toDate: this.options.toDate,
        branchId: this.options.branchId,
        originIds: this.options.originIds,
        testIds: this.options.testIds,
        testComboIds: this.options.testComboIds,
        patientTypeIds: this.options.patientTypeIds,
      })

    return {
      items: samples,
      tests,
      testCombos,
    }
  }

  async prepareTableConfig(): Promise<TableConfig<Sample>> {
    const { tests, items, testCombos } = await this.fetchData()

    return {
      name: `DS Tra KQ (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
      items,
      dateNF: DATEONLY_FORMAT,
      columns: [
        {
          columnId: 'index',
          columnName: 'STT',
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
        {
          columnId: 'infoAt',
          columnName: 'Ngày nhận mẫu',
          valueGetter(item) {
            return item.infoAt
          },
        },
        {
          columnId: 'tests',
          columnName: 'XN yêu cầu',
          valueGetter: (item) => {
            const testIds = item.results.map((test) => test.testId)
            const separated = separateTestCombo({
              testIds,
              tests: this.options.testIds.map(
                (testId) => tests.find(({ _id }) => _id === testId)!,
              ),
              testCombos,
            })

            const testNames = [
              ...separated.testCombos.map(({ name }) => name),
              ...separated.tests.map(({ name }) => name),
            ]

            if (testNames.length === 0) {
              throw SKIP_LINE_EXCEPTION
            }

            return testNames.join(', ')
          },
        },
        {
          columnId: 'Ngày trả KQ',
          columnName: 'Ngày trả KQ',
          valueGetter() {
            return ''
          },
        },
        {
          columnId: 'Người trả KQ',
          columnName: 'Người trả KQ',
          valueGetter() {
            return ''
          },
        },
        {
          columnId: 'note',
          columnName: 'Ghi chú',
          valueGetter(item) {
            return item.isTraBuuDien ? 'BĐ' : ''
          },
        },
      ],
    }
  }
}
