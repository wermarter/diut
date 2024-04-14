import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { InstrumentCreateRequestDto } from './create.request-dto'
import { exampleInstrument } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { TestUnpopulatedResponseDto } from '../../test/dto/response-dto'

export class InstrumentUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  InstrumentCreateRequestDto,
) {}

export class InstrumentResponseDto extends InstrumentUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleInstrument.test,
    type: () => TestUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => TestUnpopulatedResponseDto)
  @IsOptional()
  test?: TestUnpopulatedResponseDto | null

  @Expose()
  @ApiProperty({
    ...exampleInstrument.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
