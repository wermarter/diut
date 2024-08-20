import { PartialType } from '@nestjs/swagger'

import { PrintFormCreateRequestDto } from './create.request-dto'

export class PrintFormUpdateRequestDto extends PartialType(
  PrintFormCreateRequestDto,
) {}
