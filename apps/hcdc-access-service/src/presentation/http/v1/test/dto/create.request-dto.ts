import { IsObjectId } from '@diut/nest-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleTest } from 'src/domain'

export class TestCreateRequestDto {
  @Expose()
  @ApiProperty(exampleTest.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleTest.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleTest.shouldNotPrint)
  @IsBoolean()
  shouldNotPrint: boolean

  @Expose()
  @ApiProperty(exampleTest.shouldDisplayWithChildren)
  @IsBoolean()
  shouldDisplayWithChildren: boolean

  @Expose()
  @ApiProperty(exampleTest.bioProductId)
  @IsObjectId()
  bioProductId: string

  @Expose()
  @ApiProperty(exampleTest.instrumentId)
  @IsObjectId()
  instrumentId: string

  @Expose()
  @ApiProperty(exampleTest.sampleTypeId)
  @IsObjectId()
  sampleTypeId: string

  @Expose()
  @ApiProperty(exampleTest.testCategoryId)
  @IsObjectId()
  testCategoryId: string

  @Expose()
  @ApiProperty(exampleTest.printFormId)
  @IsObjectId()
  printFormId: string

  @Expose()
  @ApiProperty(exampleTest.branchId)
  @IsObjectId()
  branchId: string
}