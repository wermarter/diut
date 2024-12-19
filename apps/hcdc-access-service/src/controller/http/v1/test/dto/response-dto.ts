import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, ValidateNested } from 'class-validator'
import { exampleTest } from '../../../shared'
import { BioProductUnpopulatedResponseDto } from '../../bio-product/dto/response-dto'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { InstrumentUnpopulatedResponseDto } from '../../instrument/dto/response-dto'
import { PrintFormUnpopulatedResponseDto } from '../../print-form/dto/response-dto'
import { SampleTypeUnpopulatedResponseDto } from '../../sample-type/dto/response-dto'
import { TestCategoryUnpopulatedResponseDto } from '../../test-category/dto/response-dto'
import { TestRequestDto } from './request-dto'

export class TestUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestRequestDto,
) {}

export class TestResponseDto extends TestUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleTest.bioProduct,
    type: () => BioProductUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BioProductUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  bioProduct?: BioProductUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.instrument,
    type: () => InstrumentUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => InstrumentUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  instrument?: InstrumentUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.sampleType,
    type: () => SampleTypeUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => SampleTypeUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  sampleType?: SampleTypeUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.testCategory,
    type: () => TestCategoryUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestCategoryUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  testCategory?: TestCategoryUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleTest.printForms,
    type: () => PrintFormUnpopulatedResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrintFormUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  printForms?: PrintFormUnpopulatedResponseDto[]

  @Expose()
  @ApiProperty({
    ...exampleTest.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
