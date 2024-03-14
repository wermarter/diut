import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class SamplePrintRequestDto {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sampleId: string
}
