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
    }),
    overrideExisting: false,
  })
export { injectedRtkApi as reportApi }
export type ReportExportSoiNhuomApiResponse = unknown
export type ReportExportSoiNhuomApiArg = {
  exportSoiNhuomRequestDto: ExportSoiNhuomRequestDto
}
export type ExportSoiNhuomRequestDto = {
  startDate: string
  endDate: string
}
export const { useReportExportSoiNhuomMutation } = injectedRtkApi
