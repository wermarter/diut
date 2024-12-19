import { Test } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'
import { TestResponseDto } from './response-dto'

export class TestSearchRequestDto extends SearchRequestDto<Test> {}

export class TestSearchResponseDto extends PaginatedResponse(TestResponseDto) {}
