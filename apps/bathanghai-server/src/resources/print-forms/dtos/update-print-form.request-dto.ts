import { PartialType } from '@nestjs/swagger'

import { CreatePrintFormRequestDto } from './create-print-form.request-dto'

export class UpdatePrintFormRequestDto extends PartialType(
  CreatePrintFormRequestDto,
) {}
