import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { exampleInstrument } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'
import { InstrumentRequestDto } from './request-dto'

export class InstrumentUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  InstrumentRequestDto,
) {}

export class InstrumentResponseDto extends InstrumentUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleInstrument.test,
    type: () => TestUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  test?: TestUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleInstrument.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
