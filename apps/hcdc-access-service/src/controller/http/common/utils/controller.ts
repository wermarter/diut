import { StreamableFile } from '@nestjs/common'

export enum MimeType {
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export function streamExcel(input: { buffer: Buffer; filename: string }) {
  return new StreamableFile(input.buffer, {
    type: MimeType.XLSX,
    disposition: `attachment; filename="${input.filename}"`,
  })
}
