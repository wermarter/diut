import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class SampleUploadResponseDto {
  @Expose()
  @ApiProperty({
    example: 'sample-upload',
  })
  @IsString()
  @IsNotEmpty()
  bucket: string

  @Expose()
  @ApiProperty({
    example: 'filename.jpg',
  })
  @IsString()
  @IsNotEmpty()
  path: string
}
