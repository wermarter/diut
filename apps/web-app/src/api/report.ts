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
      reportExportSinhHoa: build.mutation<
        ReportExportSinhHoaApiResponse,
        ReportExportSinhHoaApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-sinh-hoa`,
          method: 'POST',
          body: queryArg.exportSinhHoaRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportTD: build.mutation<
        ReportExportTDApiResponse,
        ReportExportTDApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-td`,
          method: 'POST',
          body: queryArg.exportTDRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportHCG: build.mutation<
        ReportExportHCGApiResponse,
        ReportExportHCGApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-hcg`,
          method: 'POST',
          body: queryArg.exportHCGRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportCTM: build.mutation<
        ReportExportCTMApiResponse,
        ReportExportCTMApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-ctm`,
          method: 'POST',
          body: queryArg.exportCTMRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportHIV: build.mutation<
        ReportExportHIVApiResponse,
        ReportExportHIVApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-hiv`,
          method: 'POST',
          body: queryArg.exportHIVRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportPapsmear: build.mutation<
        ReportExportPapsmearApiResponse,
        ReportExportPapsmearApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-papsmear`,
          method: 'POST',
          body: queryArg.exportPapsmearRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportThinprep: build.mutation<
        ReportExportThinprepApiResponse,
        ReportExportThinprepApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-thinprep`,
          method: 'POST',
          body: queryArg.exportThinprepRequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
        }),
      }),
      reportExportUrine10: build.mutation<
        ReportExportUrine10ApiResponse,
        ReportExportUrine10ApiArg
      >({
        query: (queryArg) => ({
          url: `/api/reports/export-urine-10`,
          method: 'POST',
          body: queryArg.exportUrine10RequestDto,
          cache: 'no-cache',
          responseHandler: fileDownloadReponseHandler({}),
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
export type ReportExportSinhHoaApiResponse = unknown
export type ReportExportSinhHoaApiArg = {
  exportSinhHoaRequestDto: ExportSinhHoaRequestDto
}
export type ReportExportTDApiResponse = unknown
export type ReportExportTDApiArg = {
  exportTDRequestDto: ExportTDRequestDto
}
export type ReportExportHCGApiResponse = unknown
export type ReportExportHCGApiArg = {
  exportHCGRequestDto: ExportHCGRequestDto
}
export type ReportExportCTMApiResponse = unknown
export type ReportExportCTMApiArg = {
  exportCTMRequestDto: ExportCTMRequestDto
}
export type ReportExportHIVApiResponse = unknown
export type ReportExportHIVApiArg = {
  exportHIVRequestDto: ExportHIVRequestDto
}
export type ReportExportPapsmearApiResponse = unknown
export type ReportExportPapsmearApiArg = {
  exportPapsmearRequestDto: ExportPapsmearRequestDto
}
export type ReportExportThinprepApiResponse = unknown
export type ReportExportThinprepApiArg = {
  exportThinprepRequestDto: ExportThinprepRequestDto
}
export type ReportExportUrine10ApiResponse = unknown
export type ReportExportUrine10ApiArg = {
  exportUrine10RequestDto: ExportUrine10RequestDto
}
export type ReportExportTraKqApiResponse = unknown
export type ReportExportTraKqApiArg = {
  exportTraKqRequestDto: ExportTraKqRequestDto
}
export type ExportSoiNhuomRequestDto = {
  startDate: string
  endDate: string
}
export type ExportSinhHoaRequestDto = {
  startDate: string
  endDate: string
}
export type ExportTDRequestDto = {
  startDate: string
  endDate: string
}
export type ExportHCGRequestDto = {
  startDate: string
  endDate: string
}
export type ExportCTMRequestDto = {
  startDate: string
  endDate: string
}
export type ExportHIVRequestDto = {
  startDate: string
  endDate: string
}
export type ExportPapsmearRequestDto = {
  startDate: string
  endDate: string
}
export type ExportThinprepRequestDto = {
  startDate: string
  endDate: string
}
export type ExportUrine10RequestDto = {
  startDate: string
  endDate: string
}
export type ExportTraKqRequestDto = {
  startDate: string
  endDate: string
  testIds: string[]
  testComboIds: string[]
}
export const {
  useReportExportSoiNhuomMutation,
  useReportExportTraKqMutation,
  useReportExportSinhHoaMutation,
  useReportExportTDMutation,
  useReportExportHCGMutation,
  useReportExportCTMMutation,
  useReportExportHIVMutation,
  useReportExportPapsmearMutation,
  useReportExportThinprepMutation,
  useReportExportUrine10Mutation,
} = injectedRtkApi
