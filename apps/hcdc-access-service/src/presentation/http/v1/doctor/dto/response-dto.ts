import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nestjs-core'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

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
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
