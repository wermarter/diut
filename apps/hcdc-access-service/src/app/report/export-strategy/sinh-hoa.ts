import { Injectable, Scope } from '@nestjs/common'
import { PatientGender, ReportType, Sample } from '@diut/hcdc'
import { format, parseISO } from 'date-fns'
import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'

import { TableConfig } from './common'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import { BranchAssertExistsUseCase } from 'src/app/branch'

export type ReportExportSinhHoaStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportSinhHoaStrategy extends AbstractReportExportStrategy<
  ReportExportSinhHoaStrategyInput,
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

    const { samples, tests } = await this.reportQueryExportDataUseCase.execute({
      fromDate: this.options.fromDate,
      toDate: this.options.toDate,
      branchId: this.options.branchId,
      originIds: this.options.originIds,
      testIds: reportConfig[ReportType.SinhHoa]?.testIds ?? [],
    })

    return {
      items: samples,
      testColumnGroups: tests.map(({ name, elements }) => ({
        groupName: name,
        columns: elements.map(({ _id }) => ({ columnId: _id })),
      })),
      tests,
    }
  }

  async prepareTableConfig(): Promise<TableConfig<Sample>> {
    const { items, testColumnGroups, tests } = await this.fetchData()

    return {
      name: `3 So KQ SH-HH-MD (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
      items,
      columnGroups: testColumnGroups,
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
          columnId: 'patientBirthYearMale',
          columnName: 'Nam',
          valueGetter(item) {
            return item.patient?.gender === PatientGender.Male
              ? item.patient?.birthYear
              : ''
          },
        },
        {
          columnId: 'patientBirthYearFemale',
          columnName: 'Nữ',
          valueGetter(item) {
            return item.patient?.gender === PatientGender.Female
              ? item.patient?.birthYear
              : ''
          },
        },
        ...tests.flatMap(({ _id: testId, elements }) =>
          elements.map(({ _id: elementId, name }) => ({
            columnId: elementId,
            columnName: name,
            valueGetter(item: Sample) {
              const testResult = item.results.find((r) => r.testId === testId)
              const elementResult = testResult?.elements.find(
                (r) => r.testElementId === elementId,
              )
              return elementResult?.value ?? ''
            },
          })),
        ),
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
