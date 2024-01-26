import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { PrintFormCreateRequestDto } from './create.request-dto'
import { Branch, examplePrintForm } from 'src/domain'
import { BranchResponseDto } from '../../branch/dto/response-dto'

export class PrintFormUnpopulatedResponse extends IntersectionType(
  BaseResourceResponseDto,
  PrintFormCreateRequestDto,
) {}

export class PrintFormResponseDto extends PrintFormUnpopulatedResponse {
  @Expose()
  @ApiProperty({ ...examplePrintForm.branch, type: () => BranchResponseDto })
  @ValidateNested({ each: true })
  @Type(() => BranchResponseDto)
  branch?: Branch
}
