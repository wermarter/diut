import { PartialType } from '@nestjs/swagger'

import { TestComboCreateRequestDto } from './create.request-dto'

export class TestComboUpdateRequestDto extends PartialType(
  TestComboCreateRequestDto,
) {}
