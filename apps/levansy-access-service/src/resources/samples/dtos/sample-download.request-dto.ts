import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SampleDownloadRequestDto {
  @ApiProperty({
    example: 'filename.jpg',
  })
  @IsString()
  @IsNotEmpty()
  path: string
}
