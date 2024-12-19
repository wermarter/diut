import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'
import {
  PatientGender,
  TestCategory,
  allTestReportSortComparator,
} from '@diut/hcdc'
import { Injectable, Scope } from '@nestjs/common'
import { format, parseISO } from 'date-fns'
import { PatientTypeSearchUseCase } from 'src/app/patient-type/use-case/search'
import { TestSearchUseCase } from 'src/app/test/use-case/search'
import {
  ReportQuerySoNhanMauItemOutput,
  ReportQuerySoNhanMauUseCase,
} from '../use-case/query-so-nhan-mau'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { TableConfig } from './common'

export type ReportExportSoNhanMauStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  isNgoaiGio?: boolean
  patientTypeId?: string
  originId?: string
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportSoNhanMauStrategy extends AbstractReportExportStrategy<
  ReportExportSoNhanMauStrategyInput,
  unknown
> {
  constructor(
    private readonly reportQuerySoNhanMauUseCase: ReportQuerySoNhanMauUseCase,
    private readonly testSearchUseCase: TestSearchUseCase,
    private readonly patientTypeSearchUseCase: PatientTypeSearchUseCase,
  ) {
    super()
  }

  async fetchData() {
    const { items, summary } = await this.reportQuerySoNhanMauUseCase.execute(
      this.options,
    )
    const { items: allTests } = await this.testSearchUseCase.execute({
      filter: { branchId: this.options.branchId },
      populates: [
        {
          path: 'testCategory',
          fields: ['reportIndex', 'name'] satisfies (keyof TestCategory)[],
        },
      ],
    })
    const { items: patientTypes } = await this.patientTypeSearchUseCase.execute(
      {
        filter: { branchId: this.options.branchId },
        projection: { name: 1, _id: 1 },
      },
    )
    const patientTypeMap = new Map(patientTypes.map((pt) => [pt._id, pt]))

    const tests = allTests.toSorted(allTestReportSortComparator)
    const categoryMap = new Map<
      string,
      { name: string; reportIndex: number; _id: string }
    >()
    tests.forEach(({ testCategory, testCategoryId }) => {
      if (testCategory) {
        categoryMap.set(testCategory.name, {
          ...testCategory,
          _id: testCategoryId,
        })
      }
    })

    const testColumnGroups = Array.from(categoryMap.values())
      .toSorted((a, b) => a.reportIndex - b.reportIndex)
      .map(({ _id, name }) => ({
        groupName: name,
        columns: tests
          .filter(({ testCategoryId }) => _id === testCategoryId)
          .map(({ _id }) => ({ columnId: _id })),
      }))

    return { items, summary, tests, testColumnGroups, patientTypeMap }
  }

  async prepareTableConfig(): Promise<
    TableConfig<ReportQuerySoNhanMauItemOutput>
  > {
    const { items, summary, tests, testColumnGroups, patientTypeMap } =
      await this.fetchData()

    return {
      name: `SoNhanMau-${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))}-${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}.xlsx`,
      items,
      columnGroups: [
        {
          groupName: 'Thông tin khách hàng',
          columns: [
            { columnId: 'sampleId' },
            { columnId: 'patientName' },
            { columnId: 'patientBirthYear' },
            { columnId: 'patientGender' },
            { columnId: 'patientAddress' },
            { columnId: 'patientPhone' },
            { columnId: 'patientType' },
          ],
        },
        ...testColumnGroups,
      ],
      dateNF: DATETIME_FORMAT,
      columns: [
        {
          columnId: 'index',
          columnName: 'STT',
        },
        {
          columnId: 'infoAt',
          columnName: 'Ngày nhận',
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
          columnName: 'Tên',
          valueGetter(item) {
            return item.patient.name
          },
        },
        {
          columnId: 'patientBirthYear',
          columnName: 'Năm',
          valueGetter(item) {
            return item.patient.birthYear
          },
        },
        {
          columnId: 'patientGender',
          columnName: 'Giới',
          valueGetter(item) {
            return item.patient.gender === PatientGender.Male ? 'Nam' : 'Nữ'
          },
        },
        {
          columnId: 'patientAddress',
          columnName: 'Địa chỉ',
          valueGetter(item) {
            return item.patient.address
          },
        },
        {
          columnId: 'patientPhone',
          columnName: 'SĐT',
          valueGetter(item) {
            return item.patient.phoneNumber
          },
        },
        {
          columnId: 'patientType',
          columnName: 'Đối tượng',
          valueGetter(item) {
            return patientTypeMap.get(item.patientTypeId)?.name
          },
        },
        ...tests.map(({ _id, name }) => ({
          columnId: _id,
          columnName: name,
          valueGetter(item) {
            const hasTest =
              item.results.findIndex((r) => r.testId === _id) !== -1
            return hasTest ? 'x' : ''
          },
          summaryGetter() {
            return summary.test?.[_id] ?? ''
          },
        })),
        {
          columnId: 'isTraBuuDien',
          columnName: 'Trả KQ',
          valueGetter(item) {
            return item.isTraBuuDien ? 'Bưu điện' : ''
          },
          summaryGetter() {
            return summary.isTraBuuDien ?? ''
          },
        },
        {
          columnId: 'isNgoaiGio',
          columnName: 'TG',
          valueGetter(item) {
            return item.isNgoaiGio ? 'Ngoài giờ' : 'Trong giờ'
          },
          summaryGetter() {
            return summary.isNgoaiGio ?? ''
          },
        },
        {
          columnId: 'billId',
          columnName: 'Số biên lai',
          valueGetter(item) {
            return item.billId
          },
        },
      ],
    }
  }
}
