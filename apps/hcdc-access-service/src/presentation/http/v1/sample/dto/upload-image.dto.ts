import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class SampleUploadImageRequestDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File
}

export class SampleUploadImageResponseDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  storageKey: string
}
