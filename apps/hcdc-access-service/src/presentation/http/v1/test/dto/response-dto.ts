import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { TestCreateRequestDto } from './create.request-dto'
import { exampleTest } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { BioProductUnpopulatedResponseDto } from '../../bio-product/dto/response-dto'
import { InstrumentUnpopulatedResponseDto } from '../../instrument/dto/response-dto'
import { SampleTypeUnpopulatedResponseDto } from '../../sample-type/dto/response-dto'
import { TestCategoryUnpopulatedResponseDto } from '../../test-category/dto/response-dto'
import { PrintFormUnpopulatedResponseDto } from '../../print-form/dto/response-dto'

export class TestUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestCreateRequestDto,
) {}

export class TestResponseDto extends TestUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTest.bioProduct,
    type: () => BioProductUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BioProductUnpopulatedResponseDto)
  @IsOptional()
  bioProduct?: BioProductUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.instrument,
    type: () => InstrumentUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => InstrumentUnpopulatedResponseDto)
  @IsOptional()
  instrument?: InstrumentUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.sampleType,
    type: () => SampleTypeUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => SampleTypeUnpopulatedResponseDto)
  @IsOptional()
  sampleType?: SampleTypeUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.testCategory,
    type: () => TestCategoryUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestCategoryUnpopulatedResponseDto)
  @IsOptional()
  testCategory?: TestCategoryUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.printForm,
    type: () => PrintFormUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => PrintFormUnpopulatedResponseDto)
  @IsOptional()
  printForm?: PrintFormUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
