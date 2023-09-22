import { PartialType } from '@nestjs/swagger'

import { CreateTestRequestDto } from './create-test.request-dto'

export class UpdateTestRequestDto extends PartialType(CreateTestRequestDto) {}
