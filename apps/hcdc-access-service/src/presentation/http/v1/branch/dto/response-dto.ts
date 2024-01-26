import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { BranchCreateRequestDto } from './create.request-dto'
import { Branch, exampleBranch } from 'src/domain'

export class BranchUnpopulatedResponse extends IntersectionType(
  BaseResourceResponseDto,
  BranchCreateRequestDto,
) {}

export class BranchResponseDto extends BranchUnpopulatedResponse {
  @Expose()
  @ApiProperty({
    ...exampleBranch.sampleOrigins,
    type: () =>
      class OmittedBranchResponseDto extends OmitType(BranchResponseDto, [
        'sampleOrigins',
      ]) {},
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  sampleOrigins?: (Branch | null)[]
}
