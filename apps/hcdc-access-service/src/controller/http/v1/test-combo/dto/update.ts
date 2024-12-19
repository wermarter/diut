import { PartialType } from '@nestjs/swagger'
import { TestComboRequestDto } from './request-dto'

export class TestComboUpdateRequestDto extends PartialType(
  TestComboRequestDto,
) {}
