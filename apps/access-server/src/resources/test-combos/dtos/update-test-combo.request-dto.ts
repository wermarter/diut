import { PartialType } from '@nestjs/swagger'

import { CreateTestComboRequestDto } from './create-test-combo.request-dto'

export class UpdateTestComboRequestDto extends PartialType(
  CreateTestComboRequestDto
) {}
