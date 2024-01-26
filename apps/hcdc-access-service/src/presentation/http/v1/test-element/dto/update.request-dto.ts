import { PartialType } from '@nestjs/swagger'

import { TestElementCreateRequestDto } from './create.request-dto'

export class TestElementUpdateRequestDto extends PartialType(
  TestElementCreateRequestDto,
) {}
