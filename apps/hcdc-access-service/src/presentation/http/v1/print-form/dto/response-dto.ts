import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { PrintFormCreateRequestDto } from './create.request-dto'
import { examplePrintForm } from 'src/domain'
import { BranchUnpopulatedResponseDto } from '../../branch/dto/response-dto'

export class PrintFormUnpopulatedResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  PrintFormCreateRequestDto,
) {}

export class PrintFormResponseDto extends PrintFormUnpopulatedResponseDto {
  @Expose()
  @ApiProperty({
    ...examplePrintForm.branch,
    type: () => BranchUnpopulatedResponseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => BranchUnpopulatedResponseDto)
  branch?: BranchUnpopulatedResponseDto
}
