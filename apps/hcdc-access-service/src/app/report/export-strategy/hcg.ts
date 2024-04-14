import { Injectable, Scope } from '@nestjs/common'
import { ReportType, Sample } from '@diut/hcdc'
import { format, parseISO } from 'date-fns'
import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'

import { TableConfig } from './common'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import { BranchAssertExistsUseCase } from 'src/app/branch'
import { EEntityNotFound } from 'src/domain'
import { PatientTypeSearchUseCase } from 'src/app/patient-type'

export type ReportExportHCGStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportHCGStrategy extends AbstractReportExportStrategy<
  ReportExportHCGStrategyInput,
  unknown
> {
  constructor(
    private readonly reportQueryExportDataUseCase: ReportQueryExportDataUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly patientTypeSearchUseCase: PatientTypeSearchUseCase,
  ) {
    super()
  }

  async fetchData() {
    const { reportConfig } = await this.branchAssertExistsUseCase.execute({
      _id: this.options.branchId,
    })

    const testIds = reportConfig[ReportType.HCG]?.testIds
    if (testIds === undefined || testIds.length !== 1) {
      throw new EEntityNotFound(
        `branchId=${this.options.branchId} missing reportConfig for ${ReportType.HCG}`,
      )
    }

    const { samples, tests } = await this.reportQueryExportDataUseCase.execute({
      fromDate: this.options.fromDate,
      toDate: this.options.toDate,
      branchId: this.options.branchId,
      originIds: this.options.originIds,
      testIds,
    })

    const { items: patientTypes } = await this.patientTypeSearchUseCase.execute(
      {
        filter: { branchId: this.options.branchId },
        projection: { name: 1, _id: 1 },
      },
    )
    const patientTypeMap = new Map(patientTypes.map((pt) => [pt._id, pt]))

    return {
      items: samples,
      test: tests[0],
      patientTypeMap,
    }
  }

  async prepareTableConfig(): Promise<TableConfig<Sample>> {
    const { test, items, patientTypeMap } = await this.fetchData()

    return {
      name: `6 So KQ XN hCG URINE (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
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
            return item.patient?.birthYear
          },
        },
        {
          columnId: 'patientAddress',
          columnName: 'Địa chỉ',
          valueGetter(item) {
            return item.patient?.address
          },
        },
        {
          columnId: 'patientType',
          columnName: 'Đối tượng',
          valueGetter(item) {
            return patientTypeMap.get(item.patientTypeId)?.name
          },
        },
        {
          columnId: 'bioProductName',
          columnName: 'Sinh phẩm',
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            return testResult.bioProductName
          },
        },
        {
          columnId: 'result',
          columnName: 'Kết luận',
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            return testResult.elements[0].value
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
