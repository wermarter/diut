import { IsNullable, IsObjectId } from '@diut/nestjs-infra'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator'

import { exampleTest } from '../../../shared'

export class TestRequestDto {
  @Expose()
  @ApiProperty(exampleTest.displayIndex)
  @IsNumber()
  @Min(0)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTest.name)
  @IsNotEmpty()
  @IsString()
  name: string

  @Expose()
  @ApiProperty(exampleTest.shouldDisplayWithChildren)
  @IsBoolean()
  shouldDisplayWithChildren: boolean

  @Expose()
  @ApiProperty(exampleTest.bioProductId)
  @IsNullable()
  @IsObjectId()
  bioProductId: string | null

  @Expose()
  @ApiProperty(exampleTest.instrumentId)
  @IsNullable()
  @IsObjectId()
  instrumentId: string | null

  @Expose()
  @ApiProperty(exampleTest.sampleTypeId)
  @IsNullable()
  @IsObjectId()
  sampleTypeId: string | null

  @Expose()
  @ApiProperty(exampleTest.testCategoryId)
  @IsObjectId()
  testCategoryId: string

  @Expose()
  @ApiProperty(exampleTest.printFormIds)
  @IsObjectId({ each: true })
  @IsArray()
  printFormIds: string[]

  @Expose()
  @ApiProperty(exampleTest.branchId)
  @IsObjectId()
  branchId: string
}
