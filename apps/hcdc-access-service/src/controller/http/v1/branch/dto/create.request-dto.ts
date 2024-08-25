import { BranchReportConfig, BranchType } from '@diut/hcdc'
import { IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator'

import { exampleBranch } from '../../../shared'

export class BranchCreateRequestDto {
  @Expose()
  @ApiProperty(exampleBranch.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleBranch.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleBranch.address)
  @IsString()
  @IsNotEmpty()
  address: string

  @Expose()
  @ApiProperty(exampleBranch.type)
  @IsEnum(BranchType)
  type: BranchType

  @Expose()
  @ApiProperty(exampleBranch.reportConfig)
  @IsNotEmpty()
  reportConfig: BranchReportConfig

  @Expose()
  @ApiProperty(exampleBranch.sampleOriginIds)
  @IsArray()
  @IsObjectId({ each: true })
  sampleOriginIds: string[]
}
