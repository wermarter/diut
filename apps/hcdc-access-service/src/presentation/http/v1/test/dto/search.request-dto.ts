import { SearchRequestDto } from '@diut/nestjs-core'

import { Test } from 'src/domain'

export class TestSearchRequestDto extends SearchRequestDto<Test> {}
