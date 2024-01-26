import { SearchRequestDto } from '@diut/nest-core'

import { Test } from 'src/domain'

export class TestSearchRequestDto extends SearchRequestDto<Test> {}
