import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { DoctorCreateRequestDto } from './create.request-dto'
import { Branch, exampleDoctor } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class DoctorUnpopulatedResponse extends IntersectionType(
  BaseResourceResponseDto,
  DoctorCreateRequestDto,
) {}

export class DoctorResponseDto extends DoctorUnpopulatedResponse {
  @Expose()
  @ApiProperty({ ...exampleDoctor.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
