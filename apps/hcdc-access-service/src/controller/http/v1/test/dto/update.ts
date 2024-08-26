import { PartialType } from '@nestjs/swagger'

import { TestRequestDto } from './request-dto'

export class TestUpdateRequestDto extends PartialType(TestRequestDto) {}
