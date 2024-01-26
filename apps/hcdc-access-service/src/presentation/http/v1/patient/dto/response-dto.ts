import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { PatientCreateRequestDto } from './create.request-dto'
import { Branch, examplePatient } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class PatientUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientCreateRequestDto,
) {}

export class PatientResponseDto extends PatientUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({ ...examplePatient.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
