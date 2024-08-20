import { PartialType } from '@nestjs/swagger'

import { TestCategoryCreateRequestDto } from './create.request-dto'

export class TestCategoryUpdateRequestDto extends PartialType(
  TestCategoryCreateRequestDto,
) {}
