import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { TestCreateRequestDto } from './create.request-dto'
import {
  BioProduct,
  Branch,
  Instrument,
  PrintForm,
  SampleType,
  TestCategory,
  exampleTest,
} from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'
import { BioProductResponseDto } from '../../bio-product/dto/response-dto'
import { InstrumentResponseDto } from '../../instrument/dto/response-dto'
import { SampleTypeResponseDto } from '../../sample-type/dto/response-dto'
import { TestCategoryResponseDto } from '../../test-category/dto/response-dto'
import { PrintFormResponseDto } from '../../print-form/dto/response-dto'

export class TestResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  TestCreateRequestDto,
) {
  @Expose()
  @ApiProperty({ ...exampleTest.bioProduct, type: () => BioProductResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BioProductResponseDto)
  bioProduct?: BioProduct

  @Expose()
  @ApiProperty({ ...exampleTest.instrument, type: () => InstrumentResponseDto })
  @ValidateNested({ each: true })
  @Type(() => InstrumentResponseDto)
  instrument?: Instrument

  @Expose()
  @ApiProperty({ ...exampleTest.sampleType, type: () => SampleTypeResponseDto })
  @ValidateNested({ each: true })
  @Type(() => SampleTypeResponseDto)
  sampleType?: SampleType

  @Expose()
  @ApiProperty({
    ...exampleTest.testCategory,
    type: () => TestCategoryResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => TestCategoryResponseDto)
  testCategory?: TestCategory

  @Expose()
  @ApiProperty({ ...exampleTest.printForm, type: () => PrintFormResponseDto })
  @ValidateNested({ each: true })
  @Type(() => PrintFormResponseDto)
  printForm?: PrintForm

  @Expose()
  @ApiProperty({ ...exampleTest.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
