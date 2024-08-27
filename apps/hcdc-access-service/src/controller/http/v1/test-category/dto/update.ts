import { PartialType } from '@nestjs/swagger'

import { TestCategoryRequestDto } from './request-dto'

export class TestCategoryUpdateRequestDto extends PartialType(
  TestCategoryRequestDto,
) {}
