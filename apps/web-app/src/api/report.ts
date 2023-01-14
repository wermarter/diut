import { apiSlice as api } from './slice'
import { fileDownloadReponseHandler } from './utils'
export const addTagTypes = ['reports'] as const
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      reportExportSoiNhuom: build.mutation<
        ReportExportSoiNhuomApiResponse,
        ReportExportSoiNhuomApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-soi-nhuom`,
          method: 'POST',
          body: queryArg.exportSoiNhuomRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({
            defaultFilename: 'báo cáo soi nhuộm.xlsx',
          }),
        }),
      }),
      reportExportTraKq: build.mutation<
        ReportExportTraKqApiResponse,
        ReportExportTraKqApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-tra-kq`,
          method: 'POST',
          body: queryArg.exportTraKqRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({
            defaultFilename: 'danh sách trả kết quả.xlsx',
          }),
        }),
      }),
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as reportApi }
export type ReportExportSoiNhuomApiResponse = unknown
export type ReportExportSoiNhuomApiArg = {
  exportSoiNhuomRequestDto: ExportSoiNhuomRequestDto
}
export type ReportExportTraKqApiResponse = unknown
export type ReportExportTraKqApiArg = {
  exportTraKqRequestDto: ExportTraKqRequestDto
}
export type ExportSoiNhuomRequestDto = {
  startDate: string
  endDate: string
}
export type ExportTraKqRequestDto = {
  startDate: string
  endDate: string
  testIds: string[]
  testComboIds: string[]
}
export const { useReportExportSoiNhuomMutation, useReportExportTraKqMutation } =
  injectedRtkApi
