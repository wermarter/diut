import { BaseResourceResponseDto } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'
import { exampleDoctor } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { DoctorRequestDto } from './request-dto'

export class DoctorUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  DoctorRequestDto,
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
  branch?: BranchUnpopulatedResponseDto
}
