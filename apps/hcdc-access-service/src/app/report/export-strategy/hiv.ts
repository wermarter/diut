import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'
import { PatientGender, ReportType, Sample } from '@diut/hcdc'
import { Injectable, Scope } from '@nestjs/common'
import { format, parseISO } from 'date-fns'

import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { PatientTypeSearchUseCase } from 'src/app/patient-type/use-case/search'
import { EEntityNotFound } from 'src/domain'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { TableConfig } from './common'

export type ReportExportHIVStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportHIVStrategy extends AbstractReportExportStrategy<
  ReportExportHIVStrategyInput,
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

    const testIds = reportConfig[ReportType.HIV]?.testIds
    if (testIds === undefined || testIds.length !== 1) {
      throw new EEntityNotFound(
        `branchId=${this.options.branchId} missing reportConfig for ${ReportType.HIV}`,
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
      name: `8 So sang loc HIV (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
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
          columnId: 'resultDate',
          columnName: 'Ngày/Giờ XN',
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            return testResult.resultAt
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
            return testResult.elements[0]?.value
          },
        },
        {
          columnId: 'KQ khẳng định',
          columnName: 'KQ khẳng định',
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
