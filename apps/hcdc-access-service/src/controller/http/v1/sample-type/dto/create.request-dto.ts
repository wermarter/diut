import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleSampleType } from '../../../shared'

export class SampleTypeCreateRequestDto {
  @Expose()
  @ApiProperty(exampleSampleType.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleSampleType.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleSampleType.branchId)
  @IsObjectId()
  branchId: string
}
