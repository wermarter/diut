import { PaginatedResponse } from '@diut/nest-core'
import { TestResponseDto } from './test.response-dto'

export class SearchTestResponseDto extends PaginatedResponse(TestResponseDto) {}
