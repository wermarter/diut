import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { DoctorCreateRequestDto } from './create.request-dto'
import { exampleDoctor } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class DoctorUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  DoctorCreateRequestDto,
) {}

export class DoctorResponseDto extends DoctorUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...exampleDoctor.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
