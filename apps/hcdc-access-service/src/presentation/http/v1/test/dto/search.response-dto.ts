import { PaginatedResponse } from '@diut/nestjs-core'

import { TestResponseDto } from './response-dto'

export class TestSearchResponseDto extends PaginatedResponse(TestResponseDto) {}
