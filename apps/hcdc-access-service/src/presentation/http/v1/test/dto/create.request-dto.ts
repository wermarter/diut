import { IsNullable, IsObjectId } from '@diut/nestjs-infra'
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
  @ApiProperty(exampleTest.printFormId)
  @IsNullable()
  @IsObjectId()
  printFormId: string | null

  @Expose()
  @ApiProperty(exampleTest.branchId)
  @IsObjectId()
  branchId: string
}
