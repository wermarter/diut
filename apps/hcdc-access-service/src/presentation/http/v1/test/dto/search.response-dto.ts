import { PaginatedResponse } from '@diut/nest-core'

import { TestResponseDto } from './response-dto'

export class TestSearchResponseDto extends PaginatedResponse(TestResponseDto) {}
