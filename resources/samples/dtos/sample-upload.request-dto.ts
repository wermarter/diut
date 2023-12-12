import { ApiProperty } from '@nestjs/swagger'

export class SampleUploadRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File
}
