import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { PatientCreateRequestDto } from './create.request-dto'
import { examplePatient } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class PatientUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PatientCreateRequestDto,
) {}

export class PatientResponseDto extends PatientUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...examplePatient.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
