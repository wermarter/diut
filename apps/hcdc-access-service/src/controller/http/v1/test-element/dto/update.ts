import { PartialType } from '@nestjs/swagger'
import { TestElementRequestDto } from './request-dto'

export class TestElementUpdateRequestDto extends PartialType(
  TestElementRequestDto,
) {}
