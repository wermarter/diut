import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

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
  @ValidateNested({ each: true })
  @Type(() => BioProductUnpopulatedResponseDto)
  bioProduct?: BioProductUnpopulatedResponseDto

  @Expose()
  @ApiProperty({
    ...exampleTest.instrument,
    type: () => InstrumentUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => InstrumentUnpopulatedResponseDto)
  instrument?: InstrumentUnpopulatedResponseDto

  @Expose()
  @ApiProperty({
    ...exampleTest.sampleType,
    type: () => SampleTypeUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => SampleTypeUnpopulatedResponseDto)
  sampleType?: SampleTypeUnpopulatedResponseDto

  @Expose()
  @ApiProperty({
    ...exampleTest.testCategory,
    type: () => TestCategoryUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => TestCategoryUnpopulatedResponseDto)
  testCategory?: TestCategoryUnpopulatedResponseDto

  @Expose()
  @ApiProperty({
    ...exampleTest.printForm,
    type: () => PrintFormUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PrintFormUnpopulatedResponseDto)
  printForm?: PrintFormUnpopulatedResponseDto

  @Expose()
  @ApiProperty({
    ...exampleTest.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
