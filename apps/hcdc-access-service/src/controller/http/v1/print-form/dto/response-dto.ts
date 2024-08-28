import { BaseResourceResponseDto, IsNullable } from '@diut/nestjs-infra'
import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { examplePrintForm } from '../../../shared'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'
import { PrintFormRequestDto } from './request-dto'

export class PrintFormUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PrintFormRequestDto,
) {}

export class PrintFormResponseDto extends PrintFormUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...examplePrintForm.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested()
  @Type(() => BranchUnpopulatedResponseDto)
  @IsNullable()
  @IsOptional()
  branch?: BranchUnpopulatedResponseDto | null
}
