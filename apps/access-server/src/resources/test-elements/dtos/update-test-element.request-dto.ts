import { PartialType } from '@nestjs/swagger'

import { CreateTestElementRequestDto } from './create-test-element.request-dto'

export class UpdateTestElementRequestDto extends PartialType(
  CreateTestElementRequestDto
) {}
