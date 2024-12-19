import { PartialType } from '@nestjs/swagger'
import { SampleTypeRequestDto } from './request-dto'

export class SampleTypeUpdateRequestDto extends PartialType(
  SampleTypeRequestDto,
) {}
