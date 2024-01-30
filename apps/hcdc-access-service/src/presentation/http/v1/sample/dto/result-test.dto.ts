import { IsObjectId } from '@diut/nestjs-core'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

import { exampleTestResult } from 'src/domain'
import {
  SampleResultTestElementRequestDto,
  SampleResultTestElementResponseDto,
} from './result-test-element.dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'
import { UserUnpopulatedResponseDto } from '../../user/dto/response-dto'

export class SampleResultTestRequestDto {
  @Expose()
  @ApiProperty(exampleTestResult.testId)
  @IsObjectId()
  testId: string

  @Expose()
  @ApiProperty(exampleTestResult.isLocked)
  @IsBoolean()
  isLocked: boolean

  @Expose()
  @ApiProperty({
    ...exampleTestResult.elements,
    type: () => SampleResultTestElementRequestDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestElementRequestDto)
  elements: SampleResultTestElementRequestDto[]
}

export class SampleResultTestResponseDto extends SampleResultTestRequestDto {
  @Expose()
  @ApiProperty({
    ...exampleTestResult.test,
    type: () => TestUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestUnpopulatedResponseDto)
  @IsOptional()
  test?: TestUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty(exampleTestResult.resultById)
  @IsObjectId()
  resultById: string

  @Expose()
  @ApiProperty({
    ...exampleTestResult.resultBy,
    type: () => UserUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => UserUnpopulatedResponseDto)
  @IsOptional()
  resultBy?: UserUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty(exampleTestResult.resultAt)
  @IsOptional()
  @IsDateString()
  resultAt?: Date

  @Expose()
  @ApiProperty(exampleTestResult.bioProductName)
  @IsOptional()
  @IsString()
  bioProductName?: string

  @Expose()
  @ApiProperty(exampleTestResult.instrumentName)
  @IsOptional()
  @IsString()
  instrumentName?: string

  @Expose()
  @ApiProperty({
    ...exampleTestResult.elements,
    type: () => SampleResultTestElementResponseDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestElementResponseDto)
  elements: SampleResultTestElementResponseDto[] = []
}

export class OmittedTestResponseDto extends OmitType(
  SampleResultTestResponseDto,
  ['elements'],
) {}
