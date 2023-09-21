import { PartialType } from '@nestjs/swagger'

import { CreateIndicationRequestDto } from './create-indication.request-dto'

export class UpdateIndicationRequestDto extends PartialType(
  CreateIndicationRequestDto
) {}
