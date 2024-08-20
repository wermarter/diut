import { PartialType } from '@nestjs/swagger'

import { TestCreateRequestDto } from './create.request-dto'

export class TestUpdateRequestDto extends PartialType(TestCreateRequestDto) {}
