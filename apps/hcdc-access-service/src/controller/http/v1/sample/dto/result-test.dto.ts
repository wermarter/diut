import { IsNullable, IsObjectId } from '@diut/nestjs-infra'
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

import { exampleTestResult } from '../../../shared'
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
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestElementRequestDto)
  @IsArray()
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
  @IsNullable()
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
  @IsNullable()
  @IsOptional()
  resultBy?: UserUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty(exampleTestResult.resultAt)
  @IsDateString()
  @IsOptional()
  resultAt?: Date

  @Expose()
  @ApiProperty(exampleTestResult.bioProductName)
  @IsString()
  @IsOptional()
  bioProductName?: string

  @Expose()
  @ApiProperty(exampleTestResult.instrumentName)
  @IsString()
  @IsOptional()
  instrumentName?: string

  @Expose()
  @ApiProperty({
    ...exampleTestResult.elements,
    type: () => SampleResultTestElementResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => SampleResultTestElementResponseDto)
  @IsArray()
  elements: SampleResultTestElementResponseDto[] = []
}

export class OmittedTestResponseDto extends OmitType(
  SampleResultTestResponseDto,
  ['elements'],
) {}
