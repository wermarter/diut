import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { InstrumentCreateRequestDto } from './create.request-dto'
import { exampleInstrument } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class InstrumentUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  InstrumentCreateRequestDto,
) {}

export class InstrumentResponseDto extends InstrumentUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleInstrument.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
