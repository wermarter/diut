import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { PatientTypeCreateRequestDto } from './create.request-dto'
import { Branch, examplePatientType } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class PatientTypeResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientTypeCreateRequestDto,
) {
  @Expose()
  @ApiProperty({ ...examplePatientType.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
