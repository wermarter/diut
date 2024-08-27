import { Injectable, Scope } from '@nestjs/common'
import { ReportType, Sample } from '@diut/hcdc'
import { format, parseISO } from 'date-fns'
import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'

import { TableConfig } from './common'
import { AbstractReportExportStrategy } from './abstract-strategy'
import { ReportQueryExportDataUseCase } from '../use-case/query-export-data'
import { EEntityNotFound } from 'src/domain'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { UserSearchUseCase } from 'src/app/user/use-case/search'

export type ReportExportThinprepStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  originIds: string[]
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportThinprepStrategy extends AbstractReportExportStrategy<
  ReportExportThinprepStrategyInput,
  unknown
> {
  constructor(
    private readonly reportQueryExportDataUseCase: ReportQueryExportDataUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly userSearchUseCase: UserSearchUseCase,
  ) {
    super()
  }

  async fetchData() {
    const { reportConfig } = await this.branchAssertExistsUseCase.execute({
      _id: this.options.branchId,
    })

    const testIds = reportConfig[ReportType.Thinprep]?.testIds
    if (testIds === undefined || testIds.length !== 1) {
      throw new EEntityNotFound(
        `branchId=${this.options.branchId} missing reportConfig for ${ReportType.Thinprep}`,
      )
    }

    const { samples, tests } = await this.reportQueryExportDataUseCase.execute({
      fromDate: this.options.fromDate,
      toDate: this.options.toDate,
      branchId: this.options.branchId,
      originIds: this.options.originIds,
      testIds,
    })

    const { items: users } = await this.userSearchUseCase.execute({
      filter: { branchIds: this.options.branchId },
      projection: { name: 1, _id: 1 },
    })
    const userMap = new Map(users.map((user) => [user._id, user]))

    return {
      items: samples,
      test: tests[0],
      userMap,
    }
  }

  async prepareTableConfig(): Promise<TableConfig<Sample>> {
    const { test, items, userMap } = await this.fetchData()
    const [paraElement, chanDoanElement, ketLuanElement] = test.elements

    return {
      name: `7 So ThinPrep (${format(parseISO(this.options.fromDate), DATEONLY_FORMAT.replaceAll('/', '_'))} - ${format(parseISO(this.options.toDate), DATEONLY_FORMAT.replaceAll('/', '_'))}).xlsx`,
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
          columnId: 'patientPhoneNumber',
          columnName: 'SĐT',
          valueGetter(item) {
            return item.patient?.phoneNumber
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
          columnId: 'resultPara',
          columnName: paraElement.name,
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            const testElement = testResult.elements.find(
              (e) => e.testElementId === paraElement._id,
            )!
            return testElement?.value
          },
        },
        {
          columnId: 'resultChuanDoan',
          columnName: chanDoanElement.name,
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            const testElement = testResult.elements.find(
              (e) => e.testElementId === chanDoanElement._id,
            )!
            return testElement?.value
          },
        },
        {
          columnId: 'resultDate',
          columnName: 'Ngày XN',
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            return testResult.resultAt
          },
        },
        {
          columnId: 'ketluan',
          columnName: 'KQ Đọc',
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            const testElement = testResult.elements.find(
              (e) => e.testElementId === ketLuanElement._id,
            )!
            return testElement?.value
          },
        },
        {
          columnId: 'author',
          columnName: 'Người thực hiện',
          valueGetter(item) {
            const testResult = item.results.find((r) => r.testId === test._id)!
            const authorId = testResult.resultById

            if (authorId !== undefined) {
              return userMap.get(authorId)?.name
            }
          },
        },
        {
          columnId: 'KQ Hội chẩn',
          columnName: 'KQ Hội chẩn',
          valueGetter() {
            return ''
          },
        },
        {
          columnId: 'Người cùng hội chẩn',
          columnName: 'Người cùng hội chẩn',
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
