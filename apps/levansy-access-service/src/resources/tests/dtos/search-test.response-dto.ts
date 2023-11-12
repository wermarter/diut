import { PaginatedResponse } from '@diut/server-core'
import { TestResponseDto } from './test.response-dto'

export class SearchTestResponseDto extends PaginatedResponse(TestResponseDto) {}
