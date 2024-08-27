import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Test } from '@diut/hcdc'

import { TestResponseDto } from './response-dto'

export class TestSearchRequestDto extends SearchRequestDto<Test> {}

export class TestSearchResponseDto extends PaginatedResponse(TestResponseDto) {}
