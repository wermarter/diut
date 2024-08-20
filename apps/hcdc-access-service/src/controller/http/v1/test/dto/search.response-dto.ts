import { PaginatedResponse } from '@diut/nestjs-infra'

import { TestResponseDto } from './response-dto'

export class TestSearchResponseDto extends PaginatedResponse(TestResponseDto) {}
