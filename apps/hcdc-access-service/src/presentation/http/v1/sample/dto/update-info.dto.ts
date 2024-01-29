import { PartialType } from '@nestjs/swagger'

import { SampleCreateRequestDto, SampleCreateResponseDto } from './create.dto'

export class SampleUpdateInfoRequestDto extends PartialType(
  SampleCreateRequestDto,
) {}

export class SampleUpdateInfoResponseDto extends SampleCreateResponseDto {}
