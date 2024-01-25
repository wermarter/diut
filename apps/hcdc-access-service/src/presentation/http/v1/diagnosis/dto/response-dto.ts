import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { DiagnosisCreateRequestDto } from './create.request-dto'
import { Branch, exampleDiagnosis } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class DiagnosisResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  DiagnosisCreateRequestDto,
) {
  @Expose()
  @ApiProperty({ ...exampleDiagnosis.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
