import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { DiagnosisCreateRequestDto } from './create.request-dto'
import { exampleDiagnosis } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class DiagnosisUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  DiagnosisCreateRequestDto,
) {}

export class DiagnosisResponseDto extends DiagnosisUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleDiagnosis.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
