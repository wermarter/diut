import { Injectable, Scope } from '@nestjs/common'
import {
  PatientGender,
  TestCategory,
  allTestReportSortComparator,
} from '@diut/hcdc'
import { WorkBook, utils } from 'xlsx'
import { format, parseISO } from 'date-fns'
import { DATEONLY_FORMAT, DATETIME_FORMAT } from '@diut/common'

import { AbstractReportExportStrategy } from './common'
import { ReportQuerySoNhanMauUseCase } from '../use-case/query-so-nhan-mau'
import { TestSearchUseCase } from 'src/app/test'

export type ReportExportSoNhanMauStrategyInput = {
  fromDate: string
  toDate: string
  branchId: string
  isNgoaiGio?: boolean
  patientTypeId?: string
  originId?: string
}

@Injectable({ scope: Scope.TRANSIENT })
export class ReportExportSoNhanMauStrategy extends AbstractReportExportStrategy<ReportExportSoNhanMauStrategyInput> {
  constructor(
    private readonly reportQuerySoNhanMauUseCase: ReportQuerySoNhanMauUseCase,
    private readonly testSearchUseCase: TestSearchUseCase,
  ) {
    super()
  }

  async fetchData(options: ReportExportSoNhanMauStrategyInput) {
    const { items: samples, summary } =
      await this.reportQuerySoNhanMauUseCase.execute(options)
    const { items: allTests } = await this.testSearchUseCase.execute({
      filter: { branchId: options.branchId },
      populates: [
        {
          path: 'testCategory',
          fields: ['reportIndex', 'name'] satisfies (keyof TestCategory)[],
        },
      ],
    })

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

    const categories = Array.from(categoryMap.values())
      .toSorted((a, b) => a.reportIndex - b.reportIndex)
      .map(({ _id, name }) => ({
        groupId: name,
        children: tests
          .filter(({ testCategoryId }) => _id === testCategoryId)
          .map(({ _id }) => ({ field: _id })),
      }))

    return { categories, categoryMap, tests, samples, summary }
  }

  async buildWorkbook(
    workbook: WorkBook,
    options: ReportExportSoNhanMauStrategyInput,
  ) {
    const { categories, categoryMap, tests, samples, summary } =
      await this.fetchData(options)

    const worksheet = utils.sheet_new({ dense: true })
    utils.sheet_add_aoa(
      worksheet,
      [
        [
          'STT',
          'Ngày nhận',
          'ID XN',
          'Tên',
          'Năm',
          'Giới',
          'Địa chỉ',
          'SĐT',
          'Đối tượng',
          'Bưu điện',
          'TG',
        ],
        ...samples.map((sample, index) => [
          (index + 1).toString(),
          sample.infoAt,
          sample.sampleId,
          sample.patient.name,
          sample.patient.birthYear.toString(),
          sample.patient.gender === PatientGender.Male ? 'Nam' : 'Nữ',
          sample.patient.address,
          sample.patient.phoneNumber,
          sample.patientTypeId,

          sample.isTraBuuDien === true ? 'BĐ' : '',
          sample.isNgoaiGio === true ? 'Ngoài giờ' : 'Trong giờ',
        ]),
      ],
      { dateNF: DATETIME_FORMAT },
    )

    if (!worksheet['!merges']) worksheet['!merges'] = []
    // worksheet['!merges'].push(utils.decode_range('A1:E1'))

    const name = `SoNhanMau-${format(parseISO(options.fromDate), DATEONLY_FORMAT.replaceAll('/', '.'))}-${format(parseISO(options.toDate), DATEONLY_FORMAT.replaceAll('/', '.'))}.xlsx`
    utils.book_append_sheet(workbook, worksheet)
    if (!workbook.Props) workbook.Props = {}
    workbook.Props.Title = name
  }
}
