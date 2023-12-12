import { PartialType } from '@nestjs/swagger'

import { CreateTestCategoryRequestDto } from './create-test-category.request-dto'

export class UpdateTestCategoryRequestDto extends PartialType(
  CreateTestCategoryRequestDto,
) {}
